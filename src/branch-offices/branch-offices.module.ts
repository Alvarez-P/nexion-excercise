import { Module } from '@nestjs/common';
import { BranchOfficesService } from './application/branch-offices.service';
import { BranchOfficesController } from './infrastructure/branch-offices.controller';
import { BranchOfficeRepository } from './infrastructure/branch-offices.repository';
import { CoreModule } from 'src/core/core.module';
import { ConfigModule } from '@nestjs/config';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { SaleOrdersService } from 'src/sale-orders/application/sale-orders.service';
import { StockService } from 'src/stock/application/stock.service';
import { SaleOrderRepository } from 'src/sale-orders/infrastructure/sale-orders.repository';
import { EmployeeRepository } from 'src/employees/infrastructure/employees.repository';
import { SaleRepository } from 'src/sales/infrastructure/sales.repository';
import { StockRepository } from 'src/stock/infrastructure/stock.repository';
import { ProductRepository } from 'src/products/infrastructure/products.repository';
import { LogRepository } from 'src/logs/infrastructure/logs.repository';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [BranchOfficesController],
  providers: [
    BranchOfficesService,
    BranchOfficeRepository,
    QueryBuilder,
    SaleOrderRepository,
    EmployeeRepository,
    SaleRepository,
    StockRepository,
    ProductRepository,
    SaleOrdersService,
    StockService,
    LogRepository,
  ],
})
export class BranchOfficesModule {}
