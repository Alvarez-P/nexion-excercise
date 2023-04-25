import { Module } from '@nestjs/common';
import { LogsService } from './application/logs.service';
import { LogsController } from './infrastructure/logs.controller';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from 'src/core/core.module';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { LogRepository } from './infrastructure/logs.repository';
import { LogProvider } from './infrastructure/interceptors/log.provider';

@Module({
  exports: [LogProvider],
  imports: [CoreModule, ConfigModule],
  controllers: [LogsController],
  providers: [LogsService, LogRepository, QueryBuilder, LogProvider],
})
export class LogsModule {}
