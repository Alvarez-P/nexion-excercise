import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from '../domain/dto/input/create-product-category.dto';
import { UpdateProductCategoryDto } from '../domain/dto/input/update-product-category.dto';
import { TProductCategoryRepository } from '../infrastructure/product-categories.repository';
import { PRODUCT_CATEGORY_REPOSITORY } from '../constants';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { ProductCategoryFilters } from '../domain/product-category.filters';
import { ProductCategoryModel } from '../domain/product-category.model';
import { DB_MANAGER } from 'src/core/constants';
import { TransactionManager } from 'src/core/types/transaction-manager.interface';
import { ProductCategoryBuilder } from '../domain/product-category.builder';
import { plainToInstance } from 'class-transformer';
import { BaseProductCategoryDto } from '../domain/dto/output/base-product-category.dto';
import { QueryProductCategoriesDto } from '../domain/dto/input/query-product-category.dto';
import { Pagination } from 'src/core/types/pagination.interface';
import { Op } from 'sequelize';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private pCategoriesRepository: TProductCategoryRepository,
    private queryBuilder: QueryBuilder<
      ProductCategoryFilters,
      ProductCategoryModel
    >,
    @Inject(DB_MANAGER)
    private transactionManager: TransactionManager,
  ) {}

  async create(categoryDto: CreateProductCategoryDto, createdBy: string) {
    const categoryNameIsInUse = await this.pCategoriesRepository.findOne({
      where: { name: categoryDto.name },
    });
    if (categoryNameIsInUse)
      throw new BadRequestException('Category name is already in use');
    const employee = new ProductCategoryBuilder()
      .name(categoryDto.name)
      .description(categoryDto.description || null)
      .createdBy(createdBy)
      .updatedBy(createdBy)
      .build();
    const saved = await this.pCategoriesRepository.create(employee);
    return plainToInstance(BaseProductCategoryDto, saved.toJSON());
  }

  async findAll(queryDto: QueryProductCategoriesDto) {
    const query = this.queryBuilder.build(queryDto);
    const results = await this.pCategoriesRepository.findAndCountAll(query);
    const response: Pagination<BaseProductCategoryDto> = {
      items: plainToInstance(BaseProductCategoryDto, results.rows),
      count: results.count,
      offset: query.offset,
      limit: query.limit,
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  async findOne(id: string) {
    const result = await this.pCategoriesRepository.findOne({
      where: { id },
      raw: true,
      nest: true,
    });
    const response = {
      item: plainToInstance(BaseProductCategoryDto, result),
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  async update(
    id: string,
    categoryDto: UpdateProductCategoryDto,
    updatedBy: string,
  ) {
    if (categoryDto.name) {
      const categoryNameIsInUse = await this.pCategoriesRepository.findOne({
        where: { name: categoryDto.name, id: { [Op.not]: id } },
      });
      if (categoryNameIsInUse)
        throw new BadRequestException('Category name is already in use');
    }
    return this.pCategoriesRepository.update(
      { ...categoryDto, updatedBy },
      { where: { id } },
    );
  }

  remove(id: string, deletedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      await this.pCategoriesRepository.update(
        { deletedBy },
        { where: { id }, transaction },
      );
      return this.pCategoriesRepository.destroy({ where: { id }, transaction });
    });
  }
}
