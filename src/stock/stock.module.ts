import { Module } from '@nestjs/common';
import { StockService } from './application/stock.service';
import { StockController } from './infrastructure/stock.controller';
import { StockRepository } from './infrastructure/stock.repository';
import { CoreModule } from 'src/core/core.module';
import { ConfigModule } from '@nestjs/config';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { ProductRepository } from 'src/products/infrastructure/products.repository';
import { BranchOfficeRepository } from 'src/branch-offices/infrastructure/branch-offices.repository';
import { LogRepository } from 'src/logs/infrastructure/logs.repository';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [StockController],
  providers: [
    StockService,
    StockRepository,
    QueryBuilder,
    ProductRepository,
    BranchOfficeRepository,
    LogRepository,
  ],
})
export class StockModule {}
