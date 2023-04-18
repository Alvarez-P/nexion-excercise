import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './application/product-categories.service';
import { ProductCategoriesController } from './infrastructure/product-categories.controller';
import { ProductCategoryRepository } from './infrastructure/product-categories.repository';

@Module({
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService, ProductCategoryRepository],
})
export class ProductCategoriesModule {}
