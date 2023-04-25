import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './application/product-categories.service';
import { ProductCategoriesController } from './infrastructure/product-categories.controller';
import { ProductCategoryRepository } from './infrastructure/product-categories.repository';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from 'src/core/core.module';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { LogRepository } from 'src/logs/infrastructure/logs.repository';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [ProductCategoriesController],
  providers: [
    ProductCategoriesService,
    ProductCategoryRepository,
    QueryBuilder,
    LogRepository,
  ],
})
export class ProductCategoriesModule {}
