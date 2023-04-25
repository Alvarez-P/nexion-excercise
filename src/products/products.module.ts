import { Module } from '@nestjs/common';
import { ProductsService } from './application/products.service';
import { ProductsController } from './infrastructure/products.controller';
import { ProductRepository } from './infrastructure/products.repository';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from 'src/core/core.module';
import { ProductCategoryRepository } from 'src/product-categories/infrastructure/product-categories.repository';
import { LogRepository } from 'src/logs/infrastructure/logs.repository';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepository,
    QueryBuilder,
    LogRepository,
    ProductCategoryRepository,
  ],
})
export class ProductsModule {}
