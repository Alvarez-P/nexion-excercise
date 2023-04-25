import { Module } from '@nestjs/common';
import { SalesService } from './application/sales.service';
import { SalesController } from './infrastructure/sales.controller';
import { SaleRepository } from './infrastructure/sales.repository';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from 'src/core/core.module';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { SaleOrderRepository } from 'src/sale-orders/infrastructure/sale-orders.repository';
import { ProductRepository } from 'src/products/infrastructure/products.repository';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [SalesController],
  providers: [
    SalesService,
    SaleRepository,
    SaleOrderRepository,
    QueryBuilder,
    ProductRepository,
  ],
})
export class SalesModule {}
