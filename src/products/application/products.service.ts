import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../domain/dto/input/create-product.dto';
import { UpdateProductDto } from '../domain/dto/input/update-product.dto';
import { PRODUCT_REPOSITORY } from '../constants';
import { TProductRepository } from '../infrastructure/products.repository';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { ProductFilters } from '../domain/product.filters';
import { ProductModel } from '../domain/product.model';
import { DB_MANAGER, EmployeeRole } from 'src/core/constants';
import { TransactionManager } from 'src/core/types/transaction-manager.interface';
import { TProductCategoryRepository } from 'src/product-categories/infrastructure/product-categories.repository';
import { PRODUCT_CATEGORY_REPOSITORY } from 'src/product-categories/constants';
import { ProductBuilder } from '../domain/product.builder';
import { plainToInstance } from 'class-transformer';
import { BaseProductDto } from '../domain/dto/output/base-product.dto';
import { QueryProductsDto } from '../domain/dto/input/query-products.dto';
import { Pagination } from 'src/core/types/pagination.interface';
import { Op } from 'sequelize';
import { Product } from '../domain/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private productRepository: TProductRepository,
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private pCategoryRepository: TProductCategoryRepository,
    private queryBuilder: QueryBuilder<ProductFilters, ProductModel>,
    @Inject(DB_MANAGER)
    private transactionManager: TransactionManager,
  ) {}

  create(productDto: CreateProductDto, createdBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      const productNameIsInUse = await this.productRepository.findOne({
        where: { name: productDto.name },
        transaction,
        raw: true,
        nest: true,
      });
      if (productNameIsInUse)
        throw new BadRequestException('Product name is already in use');
      const category = await this.pCategoryRepository.findOne({
        where: { id: productDto.categoryId },
        transaction,
        raw: true,
        nest: true,
      });
      if (!category) throw new BadRequestException('Invalid product category');
      const product = new ProductBuilder()
        .name(productDto.name)
        .categoryId(productDto.categoryId)
        .category(category)
        .cost(productDto.cost)
        .price(productDto.price)
        .createdBy(createdBy)
        .updatedBy(createdBy)
        .build();
      const saved = await this.productRepository.create(product, {
        transaction,
      });
      return plainToInstance(BaseProductDto, saved.toJSON());
    });
  }

  async findAll(queryDto: QueryProductsDto, role: EmployeeRole) {
    const query = this.queryBuilder.build(queryDto);
    const results = await this.productRepository.findAndCountAll({
      ...query,
      include: ['category'],
      paranoid: role !== 'admin',
    });
    const response: Pagination<BaseProductDto> = {
      items: plainToInstance(BaseProductDto, results.rows),
      count: results.count,
      offset: query.offset,
      limit: query.limit,
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  async findOne(id: string) {
    const result = await this.productRepository.findOne({
      where: { id },
      include: ['category'],
      raw: true,
      nest: true,
    });
    const response = {
      item: plainToInstance(BaseProductDto, result),
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  update(id: string, productDto: UpdateProductDto, updatedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      const productChanges: Partial<Product> = { ...productDto, updatedBy };
      if (productDto.name) {
        const productNameIsInUse = await this.productRepository.findOne({
          where: { name: productDto.name, id: { [Op.not]: id } },
          transaction,
        });
        if (productNameIsInUse)
          throw new BadRequestException('Product name is already in use');
      }
      if (productDto.categoryId) {
        const category = await this.pCategoryRepository.findOne({
          where: { id: productDto.categoryId },
          transaction,
        });
        if (!category)
          throw new BadRequestException('Invalid product category');
        productChanges.category = category;
      }
      return this.productRepository.update(productChanges, { where: { id } });
    });
  }

  remove(id: string, deletedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      await this.productRepository.update(
        { deletedBy },
        { where: { id }, transaction },
      );
      return this.productRepository.destroy({
        where: { id },
        transaction,
      });
    });
  }
}
