import { Module } from '@nestjs/common';
import { LogsService } from './application/logs.service';
import { LogsController } from './infrastructure/logs.controller';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from 'src/core/core.module';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { LogRepository } from './infrastructure/logs.repository';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [LogsController],
  providers: [LogsService, LogRepository, QueryBuilder],
})
export class LogsModule {}
