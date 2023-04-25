import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateStockDto } from '../domain/dto/input/create-stock.dto';
import { UpdateStockDto } from '../domain/dto/input/update-stock.dto';
import { BRANCH_OFFICE_REPOSITORY } from 'src/branch-offices/constants';
import { STOCK_REPOSITORY } from '../constants';
import { TBranchOfficeRepository } from 'src/branch-offices/infrastructure/branch-offices.repository';
import { TStockRepository } from '../infrastructure/stock.repository';
import { PRODUCT_REPOSITORY } from 'src/products/constants';
import { TProductRepository } from 'src/products/infrastructure/products.repository';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { StockFilters } from '../domain/stock.filters';
import { StockModel } from '../domain/stock.model';
import { DB_MANAGER } from 'src/core/constants';
import { TransactionManager } from 'src/core/types/transaction-manager.interface';
import { StockBuilder } from '../domain/stock.builder';
import { plainToInstance } from 'class-transformer';
import { BaseStockDto } from '../domain/dto/output/base-stock.dto';
import { QueryStockDto } from '../domain/dto/input/query-stock.dto';
import { Pagination } from 'src/core/types/pagination.interface';

@Injectable()
export class StockService {
  constructor(
    @Inject(STOCK_REPOSITORY)
    private stockRepository: TStockRepository,
    @Inject(BRANCH_OFFICE_REPOSITORY)
    private branchOfficeRepository: TBranchOfficeRepository,
    @Inject(PRODUCT_REPOSITORY)
    private productRepository: TProductRepository,
    private queryBuilder: QueryBuilder<StockFilters, StockModel>,
    @Inject(DB_MANAGER)
    private transactionManager: TransactionManager,
  ) {}

  async create(stockDto: CreateStockDto, createdBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      const branchOffice = await this.branchOfficeRepository.findOne({
        where: { id: stockDto.branchOfficeId },
        transaction,
      });
      if (!branchOffice) throw new BadRequestException('Invalid branch office');
      const product = await this.productRepository.findOne({
        where: { id: stockDto.productId },
        transaction,
      });
      if (!product) throw new BadRequestException('Invalid product');
      const stockExists = await this.stockRepository.findOne({
        where: {
          productId: stockDto.productId,
          branchOfficeId: stockDto.productId,
        },
        raw: true,
      });
      if (stockExists) throw new BadRequestException('Stock already exists');
      const stock = new StockBuilder()
        .productId(stockDto.productId)
        .branchOfficeId(stockDto.branchOfficeId)
        .amount(stockDto.amount)
        .createdBy(createdBy)
        .updatedBy(createdBy)
        .build();
      const saved = await this.stockRepository.create(stock, { transaction });
      return plainToInstance(BaseStockDto, saved.toJSON());
    });
  }

  async findAll(queryDto: QueryStockDto) {
    const query = this.queryBuilder.build(queryDto);
    const results = await this.stockRepository.findAndCountAll({
      ...query,
      include: ['branchOffice', 'product'],
    });
    const response: Pagination<BaseStockDto> = {
      items: plainToInstance(BaseStockDto, results.rows),
      count: results.count,
      offset: query.offset,
      limit: query.limit,
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  async findOne(id: string) {
    const result = await this.stockRepository.findOne({
      where: { id },
      include: ['branchOffice', 'product'],
      raw: true,
    });
    const response = {
      item: plainToInstance(BaseStockDto, result),
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  update(id: string, updateStockDto: UpdateStockDto, updatedBy: string) {
    return this.stockRepository.update(
      { ...updateStockDto, updatedBy },
      { where: { id } },
    );
  }

  remove(id: string, deletedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      await this.stockRepository.update(
        { deletedBy },
        { where: { id }, transaction },
      );
      return this.stockRepository.destroy({
        where: { id },
        transaction,
      });
    });
  }
}
