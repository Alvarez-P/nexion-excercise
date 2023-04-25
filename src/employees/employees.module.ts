import { Module } from '@nestjs/common';
import { EmployeesController } from './infrastructure/employees.controller';
import { EmployeesService } from './application/employees.service';
import { EmployeeRepository } from './infrastructure/employees.repository';
import { CoreModule } from 'src/core/core.module';
import { EncryptionService } from 'src/core/application/encryption.service';
import { ConfigModule } from '@nestjs/config';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { LogRepository } from 'src/logs/infrastructure/logs.repository';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    EmployeeRepository,
    EncryptionService,
    QueryBuilder,
    LogRepository,
  ],
})
export class EmployeesModule {}
