import { Module } from '@nestjs/common';
import { SaleOrdersService } from './application/sale-orders.service';
import { SaleOrdersController } from './infrastructure/sale-orders.controller';
import { SaleOrderModelRepository } from './infrastructure/stock.repository';

@Module({
  controllers: [SaleOrdersController],
  providers: [SaleOrdersService, SaleOrderModelRepository],
})
export class SaleOrdersModule {}
