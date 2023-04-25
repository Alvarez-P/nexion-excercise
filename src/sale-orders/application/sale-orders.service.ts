import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSaleOrderDto } from '../domain/dto/input/create-sale-order.dto';
import { UpdateSaleOrderDto } from '../domain/dto/input/update-sale-order.dto';
import { SALE_ORDER_REPOSITORY } from '../constants';
import { TSaleOrderRepository } from '../infrastructure/sale-orders.repository';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { DB_MANAGER } from 'src/core/constants';
import { TransactionManager } from 'src/core/types/transaction-manager.interface';
import { SaleOrderBuilder } from '../domain/sale-orders.builder';
import { EMPLOYEE_REPOSITORY } from 'src/employees/constants';
import { TEmployeeRepository } from 'src/employees/infrastructure/employees.repository';
import { BRANCH_OFFICE_REPOSITORY } from 'src/branch-offices/constants';
import { TBranchOfficeRepository } from 'src/branch-offices/infrastructure/branch-offices.repository';
import { plainToInstance } from 'class-transformer';
import { BaseSaleOrderDto } from '../domain/dto/output/base-sale-orders.dto';
import { Pagination } from 'src/core/types/pagination.interface';
import { QuerySaleOrdersDto } from '../domain/dto/input/query-sale-order.dto';
import { SaleOrderFilters } from '../domain/sale-orders.filters';
import { SaleOrderModel } from '../domain/sale-orders.model';
import { SALE_REPOSITORY } from 'src/sales/constants';
import { TSaleRepository } from 'src/sales/infrastructure/sales.repository';
import { STOCK_REPOSITORY } from 'src/stock/constants';
import { TStockRepository } from 'src/stock/infrastructure/stock.repository';
import { Transaction } from 'sequelize';
import { SaleOrder } from '../domain/sale-orders.entity';

@Injectable()
export class SaleOrdersService {
  constructor(
    @Inject(SALE_ORDER_REPOSITORY)
    private saleOrderRepository: TSaleOrderRepository,
    @Inject(EMPLOYEE_REPOSITORY)
    private employeeRepository: TEmployeeRepository,
    @Inject(BRANCH_OFFICE_REPOSITORY)
    private branchOfficeRepository: TBranchOfficeRepository,
    @Inject(SALE_REPOSITORY)
    private saleRepository: TSaleRepository,
    @Inject(STOCK_REPOSITORY)
    private stockRepository: TStockRepository,
    private queryBuilder: QueryBuilder<SaleOrderFilters, SaleOrderModel>,
    @Inject(DB_MANAGER)
    private transactionManager: TransactionManager,
  ) {}

  async create(saleOrderDto: CreateSaleOrderDto, createdBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      const branchOffice = await this.branchOfficeRepository.findOne({
        where: { id: saleOrderDto.branchOfficeId },
        transaction,
        raw: true,
        nest: true,
      });
      if (!branchOffice) throw new BadRequestException('Invalid branch office');
      const saleOrder = new SaleOrderBuilder()
        .sellerId(createdBy)
        .branchOfficeId(saleOrderDto.branchOfficeId)
        .branchOffice(branchOffice)
        .createdBy(createdBy)
        .updatedBy(createdBy)
        .build();
      const saved = await this.saleOrderRepository.create(saleOrder, {
        transaction,
      });
      return plainToInstance(BaseSaleOrderDto, saved.toJSON());
    });
  }

  async findAll(queryDto: QuerySaleOrdersDto) {
    const query = this.queryBuilder.build(queryDto);
    const results = await this.saleOrderRepository.findAndCountAll({
      ...query,
      include: ['branchOffice', 'seller'],
    });
    const response: Pagination<BaseSaleOrderDto> = {
      items: plainToInstance(BaseSaleOrderDto, results.rows),
      count: results.count,
      offset: query.offset,
      limit: query.limit,
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  async findOne(id: string) {
    const result = await this.saleOrderRepository.findOne({
      where: { id },
      include: ['branchOffice', 'seller'],
      raw: true,
      nest: true,
    });
    const response = {
      item: plainToInstance(BaseSaleOrderDto, result),
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  setStatus(id: string, status: 'cancelled' | 'paid', updatedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      const orderChanges: Partial<SaleOrder> = { status, updatedBy };
      const order = await this.saleOrderRepository.findOne({
        where: { id, status: 'pending' },
      });
      if (!order) throw new BadRequestException('Invalid sale order');
      if (status === 'paid') {
        orderChanges.total = 0;
        const orderItems = await this.saleRepository.findAll({
          where: { saleOrderId: id },
          include: ['product'],
          raw: true,
          nest: true,
          transaction,
        });
        for (const orderItem of orderItems) {
          orderChanges.total += orderItem.amount * orderItem.product.price;
          const stockFilters = {
            productId: orderItem.productId,
            branchOfficeId: order.dataValues.branchOfficeId,
          };
          const stock = await this.stockRepository.findOne({
            where: stockFilters,
            raw: true,
            transaction,
          });
          if (!stock || stock.amount < orderItem.amount)
            throw new BadRequestException(
              'Invalid stock for product: ' + orderItem.product.name,
            );
          await this.stockRepository.update(
            { amount: stock.amount - orderItem.amount, updatedBy },
            { where: stockFilters, transaction },
          );
        }
      }
      await order.update(orderChanges, { transaction });
      return order.toJSON();
    });
  }

  async sell(
    id: string,
    order: SaleOrderModel,
    updatedBy: string,
    transaction: Transaction,
  ) {
    let total = 0;
    const orderItems = await this.saleRepository.findAll({
      where: { saleOrderId: id },
      include: ['product'],
      raw: true,
      nest: true,
      transaction,
    });
    for (const orderItem of orderItems) {
      total += orderItem.amount * orderItem.product.price;
      const stockFilters = {
        productId: orderItem.productId,
        branchOfficeId: order.dataValues.branchOfficeId,
      };
      const stock = await this.stockRepository.findOne({
        where: stockFilters,
        raw: true,
        transaction,
      });
      if (!stock || stock.amount < orderItem.amount)
        throw new BadRequestException(
          'Invalid stock for product: ' + orderItem.product.name,
        );
      await this.stockRepository.update(
        { amount: stock.amount - orderItem.amount, updatedBy },
        { where: stockFilters, transaction },
      );
    }
    return order.update({ total, updatedBy }, { transaction });
  }

  update(id: string, saleOrderDto: UpdateSaleOrderDto, updatedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      const seller = await this.employeeRepository.findOne({
        where: { id: saleOrderDto.sellerId },
        transaction,
      });
      if (!seller) throw new BadRequestException('Invalid seller');
      return this.saleOrderRepository.update(
        { ...saleOrderDto, updatedBy },
        { where: { id }, transaction },
      );
    });
  }

  remove(id: string, deletedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      await this.saleOrderRepository.update(
        { deletedBy },
        { where: { id }, transaction },
      );
      return this.saleOrderRepository.destroy({
        where: { id },
        transaction,
      });
    });
  }
}
