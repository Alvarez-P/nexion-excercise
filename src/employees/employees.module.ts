import { Module } from '@nestjs/common';
import { EmployeesController } from './infrastructure/employees.controller';
import { EmployeesService } from './application/employees.service';
import { EmployeeRepository } from './infrastructure/employees.repository';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeeRepository],
})
export class EmployeesModule {}
