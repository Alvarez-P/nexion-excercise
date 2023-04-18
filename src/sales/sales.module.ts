import { Module } from '@nestjs/common';
import { SalesService } from './application/sales.service';
import { SalesController } from './infrastructure/sales.controller';
import { SaleRepository } from './infrastructure/sales.repository';

@Module({
  controllers: [SalesController],
  providers: [SalesService, SaleRepository],
})
export class SalesModule {}
