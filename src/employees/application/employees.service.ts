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
import { UpdateEmployeeDto } from '../domain/dto/input/update-employee.dto';
import { TransactionManager } from 'src/core/types/transaction-manager.interface';
import { DB_MANAGER } from 'src/core/constants';
import { Op } from 'sequelize';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private employeeRepository: TEmployeeRepository,
    private encryptionService: EncryptionService,
    private queryBuilder: QueryBuilder<EmployeeFilters, EmployeeModel>,
    @Inject(DB_MANAGER)
    private transactionManager: TransactionManager,
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
    const saved = await this.employeeRepository.create(employee);
    return plainToInstance(BaseEmployeeDto, saved.toJSON());
  }

  async findAll(queryDto: QueryEmployeesDto) {
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

  async findOne(id: string) {
    const result = await this.employeeRepository.findOne({
      where: { id },
      raw: true,
      nest: true,
    });
    const response = {
      item: plainToInstance(BaseEmployeeDto, result),
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  async update(id: string, employeeDto: UpdateEmployeeDto, updatedBy: string) {
    if (employeeDto.userName) {
      const userNameIsInUse = await this.employeeRepository.findOne({
        where: { userName: employeeDto.userName, id: { [Op.not]: id } },
      });
      if (userNameIsInUse)
        throw new BadRequestException('Username is already in use');
    }
    if (employeeDto.password)
      employeeDto.password = this.encryptionService.encrypt(
        employeeDto.password,
      );
    return this.employeeRepository.update(
      { ...employeeDto, updatedBy },
      { where: { id } },
    );
  }

  remove(id: string, deletedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      await this.employeeRepository.update(
        { deletedBy },
        { where: { id }, transaction },
      );
      return this.employeeRepository.destroy({ where: { id }, transaction });
    });
  }
}
