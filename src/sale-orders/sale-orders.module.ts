import { Module } from '@nestjs/common';
import { SaleOrdersService } from './application/sale-orders.service';
import { SaleOrdersController } from './infrastructure/sale-orders.controller';
import { SaleOrderRepository } from './infrastructure/sale-orders.repository';
import { CoreModule } from 'src/core/core.module';
import { ConfigModule } from '@nestjs/config';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { EmployeeRepository } from 'src/employees/infrastructure/employees.repository';
import { BranchOfficeRepository } from 'src/branch-offices/infrastructure/branch-offices.repository';
import { SaleRepository } from 'src/sales/infrastructure/sales.repository';
import { StockRepository } from 'src/stock/infrastructure/stock.repository';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [SaleOrdersController],
  providers: [
    SaleOrdersService,
    SaleOrderRepository,
    QueryBuilder,
    EmployeeRepository,
    BranchOfficeRepository,
    SaleRepository,
    StockRepository,
  ],
})
export class SaleOrdersModule {}
