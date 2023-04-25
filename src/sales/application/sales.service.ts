import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from '../domain/dto/input/create-sale.dto';
import { UpdateSaleDto } from '../domain/dto/input/update-sale.dto';
import { SALE_REPOSITORY } from '../constants';
import { SALE_ORDER_REPOSITORY } from 'src/sale-orders/constants';
import { TSaleRepository } from '../infrastructure/sales.repository';
import { TSaleOrderRepository } from 'src/sale-orders/infrastructure/sale-orders.repository';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { SaleFilters } from '../domain/sale.filters';
import { SaleModel } from '../domain/sale.model';
import { DB_MANAGER } from 'src/core/constants';
import { TransactionManager } from 'src/core/types/transaction-manager.interface';
import { SaleBuilder } from '../domain/sale.builder';
import { PRODUCT_REPOSITORY } from 'src/products/constants';
import { TProductRepository } from 'src/products/infrastructure/products.repository';
import { plainToInstance } from 'class-transformer';
import { BaseSaleDto } from '../domain/dto/output/base-sale.dto';
import { QuerySalesDto } from '../domain/dto/input/query-sale.dto';
import { Pagination } from 'src/core/types/pagination.interface';
import { Sale } from '../domain/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @Inject(SALE_REPOSITORY)
    private saleRepository: TSaleRepository,
    @Inject(SALE_ORDER_REPOSITORY)
    private saleOrderRepository: TSaleOrderRepository,
    @Inject(PRODUCT_REPOSITORY)
    private productRepository: TProductRepository,
    private queryBuilder: QueryBuilder<SaleFilters, SaleModel>,
    @Inject(DB_MANAGER)
    private transactionManager: TransactionManager,
  ) {}

  create(saleDto: CreateSaleDto, createdBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      const product = await this.productRepository.findOne({
        where: { id: saleDto.productId },
        raw: true,
        nest: true,
        transaction,
      });
      if (!product) throw new BadRequestException('Invalid product');
      const saleOrder = await this.saleOrderRepository.findOne({
        where: { id: saleDto.saleOrderId, status: 'pending' },
        transaction,
        raw: true,
        nest: true,
      });
      if (!saleOrder) throw new BadRequestException('Invalid sale order');
      const sale = new SaleBuilder()
        .productId(saleDto.productId)
        .saleOrderId(saleDto.saleOrderId)
        .amount(saleDto.amount)
        .total(saleDto.amount * product.price)
        .createdBy(createdBy)
        .updatedBy(createdBy)
        .build();
      const saved = await this.saleRepository.create(sale, {
        transaction,
      });
      return plainToInstance(BaseSaleDto, saved.toJSON());
    });
  }

  async findAll(queryDto: QuerySalesDto) {
    const query = this.queryBuilder.build(queryDto);
    const results = await this.saleRepository.findAndCountAll({
      ...query,
      include: ['product'],
    });
    const response: Pagination<BaseSaleDto> = {
      items: plainToInstance(BaseSaleDto, results.rows),
      count: results.count,
      offset: query.offset,
      limit: query.limit,
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  async findOne(id: string) {
    const result = await this.saleRepository.findOne({
      where: { id },
      include: ['product'],
      raw: true,
      nest: true,
    });
    const response = {
      item: plainToInstance(BaseSaleDto, result),
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  update(id: string, saleDto: UpdateSaleDto, updatedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      const saleChanges: Partial<Sale> = { ...saleDto, updatedBy };
      const sale = await this.saleRepository.findOne({
        where: { id },
        include: ['product'],
        raw: true,
        nest: true,
      });
      console.log(sale);
      if (!sale) return;
      saleChanges.product = sale.product;
      if (saleDto.productId) {
        const newProduct = await this.productRepository.findOne({
          where: { id: saleDto.productId },
          raw: true,
          nest: true,
          transaction,
        });
        if (!newProduct) throw new BadRequestException('Invalid product');
        saleChanges.product = newProduct;
      }
      if (!saleChanges.amount) saleChanges.amount = sale.amount;
      saleChanges.total = saleChanges.product.price * saleChanges.amount;
      console.log(saleChanges);
      return this.saleRepository.update(saleChanges, {
        where: { id },
        transaction,
      });
    });
  }

  remove(id: string, deletedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      await this.saleRepository.update(
        { deletedBy },
        { where: { id }, transaction },
      );
      return this.saleRepository.destroy({
        where: { id },
        transaction,
      });
    });
  }
}
