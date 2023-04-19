import { Module } from '@nestjs/common';
import { LogsService } from './application/logs.service';
import { LogsController } from './infrastructure/logs.controller';

@Module({
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
