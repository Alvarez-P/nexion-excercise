import { Inject, Injectable } from '@nestjs/common';
import { EMPLOYEE_REPOSITORY } from '../constants';
import { TEmployeeRepository } from '../infrastructure/employees.repository';
import { CreateEmployeeDto } from '../dto/input/create-employee.dto';
import { EmployeeBuilder } from '../domain/employee.builder';
import { plainToInstance } from 'class-transformer';
import { BaseEmployeeDto } from '../dto/output/base-employee.dto';
import { EncryptionService } from 'src/core/application/encryption.service';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private employeeRepository: TEmployeeRepository,
    private encryptionService: EncryptionService,
  ) {}

  async create(employeeDto: CreateEmployeeDto, createdBy: string) {
    const hashedPassword = this.encryptionService.encrypt(employeeDto.password);
    const employee = new EmployeeBuilder()
      .userName(employeeDto.userName)
      .role(employeeDto.role)
      .firstName(employeeDto.firstName)
      .lastName(employeeDto.lastName)
      .birthday(employeeDto.birthday)
      .password(hashedPassword)
      .createdBy(createdBy)
      .build();
    const saved = await this.employeeRepository.create(employee);
    return plainToInstance(BaseEmployeeDto, saved);
  }
}
