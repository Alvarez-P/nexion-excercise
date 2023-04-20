import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EMPLOYEE_REPOSITORY } from '../constants';
import { TEmployeeRepository } from '../infrastructure/employees.repository';
import { CreateEmployeeDto } from '../domain/dto/input/create-employee.dto';
import { EmployeeBuilder } from '../domain/employee.builder';
import { plainToInstance } from 'class-transformer';
import { BaseEmployeeDto } from '../domain/dto/output/base-employee.dto';
import { EncryptionService } from 'src/core/application/encryption.service';
import { QueryEmployeesDto } from '../domain/dto/input/query-employee.dto';
import { EmployeeFilters } from '../domain/employee.filters';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { EmployeeModel } from '../domain/employee.model';
import { Pagination } from 'src/core/types/pagination.interface';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private employeeRepository: TEmployeeRepository,
    private encryptionService: EncryptionService,
    private queryBuilder: QueryBuilder<EmployeeFilters, EmployeeModel>,
  ) {}

  async create(employeeDto: CreateEmployeeDto, createdBy: string) {
    const userNameIsInUse = await this.employeeRepository.findOne({
      where: { userName: employeeDto.userName },
    });
    if (userNameIsInUse)
      throw new BadRequestException('Username is already in use');
    const hashedPassword = this.encryptionService.encrypt(employeeDto.password);
    const employee = new EmployeeBuilder()
      .userName(employeeDto.userName)
      .role(employeeDto.role)
      .firstName(employeeDto.firstName)
      .lastName(employeeDto.lastName)
      .birthday(employeeDto.birthday)
      .password(hashedPassword)
      .createdBy(createdBy)
      .updatedBy(createdBy)
      .build();
    const saved = await this.employeeRepository.create(employee, { raw: true });
    return plainToInstance(BaseEmployeeDto, saved);
  }

  async find(queryDto: QueryEmployeesDto) {
    const query = this.queryBuilder.build(queryDto);
    const results = await this.employeeRepository.findAndCountAll(query);
    const response: Pagination<BaseEmployeeDto> = {
      items: plainToInstance(BaseEmployeeDto, results.rows),
      count: results.count,
      offset: query.offset,
      limit: query.limit,
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }
}
