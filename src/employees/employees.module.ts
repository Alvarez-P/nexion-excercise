import { Module } from '@nestjs/common';
import { EmployeesController } from './infrastructure/employees.controller';
import { EmployeesService } from './application/employees.service';
import { EmployeeRepository } from './infrastructure/employees.repository';
import { CoreModule } from 'src/core/core.module';
import { EncryptionService } from 'src/core/application/encryption.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeeRepository, EncryptionService],
})
export class EmployeesModule {}
