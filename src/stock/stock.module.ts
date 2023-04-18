import { Module } from '@nestjs/common';
import { StockService } from './application/stock.service';
import { StockController } from './infrastructure/stock.controller';
import { StockRepository } from './infrastructure/stock.repository';

@Module({
  controllers: [StockController],
  providers: [StockService, StockRepository],
})
export class StockModule {}
