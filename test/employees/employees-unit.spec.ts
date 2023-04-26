import { ConfigService } from '@nestjs/config';
import { GroupedCountResultItem } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { BranchOfficeModel } from 'src/branch-offices/domain/branch-office.model';
import { EncryptionService } from 'src/core/application/encryption.service';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { EmployeesService } from 'src/employees/application/employees.service';
import { Employee } from 'src/employees/domain/employee.entity';
import { EmployeeFilters } from 'src/employees/domain/employee.filters';
import { EmployeeModel } from 'src/employees/domain/employee.model';
import { TEmployeeRepository } from 'src/employees/infrastructure/employees.repository';
import { ProductCategoryModel } from 'src/product-categories/domain/product-category.model';
import { ProductModel } from 'src/products/domain/product.model';
import { SaleOrderModel } from 'src/sale-orders/domain/sale-orders.model';
import { StockModel } from 'src/stock/domain/stock.model';
import {
  createEmployeeDtoFactory,
  employeeFactory,
} from 'test/helpers/entities-factory';
import { TransactionManagerMock } from 'test/helpers/transaction-manager';

describe('EmployeeModule /employee', () => {
  let sut: EmployeesService;
  let admin: Employee;
  let employeeRepositoryMock: TEmployeeRepository;
  beforeEach(async () => {
    jest.resetAllMocks();
    admin = employeeFactory({});
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      database: ':memory:',
      logging: false,
    });
    sequelize.addModels([
      EmployeeModel,
      SaleOrderModel,
      BranchOfficeModel,
      StockModel,
      ProductModel,
      ProductCategoryModel,
    ]);
    const configService = new ConfigService();
    const encryptionService = new EncryptionService(configService);
    const queryBuilder = new QueryBuilder<EmployeeFilters, EmployeeModel>();
    employeeRepositoryMock = EmployeeModel;
    const transactionManagerMock = new TransactionManagerMock();
    sut = new EmployeesService(
      employeeRepositoryMock,
      encryptionService,
      queryBuilder,
      transactionManagerMock,
    );
  });

  it('/ >> Add new employee', async () => {
    const createEmployeeDto = createEmployeeDtoFactory({ role: 'user' });
    const employee = employeeFactory({
      ...createEmployeeDto,
      createdBy: admin.id,
      updatedBy: admin.id,
    });
    const createRepositorySpy = jest
      .spyOn(employeeRepositoryMock, 'create')
      .mockReturnValue(Promise.resolve({ toJSON: () => employee }));
    const findOneRepositorySpy = jest
      .spyOn(employeeRepositoryMock, 'findOne')
      .mockReturnValue(Promise.resolve(null));
    const response = await sut.create(createEmployeeDto, admin.id);
    expect(response).not.toHaveProperty('password');
    expect(response.createdBy).toBe(admin.id);
    expect(createRepositorySpy).toHaveBeenCalledTimes(1);
    expect(findOneRepositorySpy).toHaveBeenCalledTimes(1);
  });

  it('/ >> Get all users', async () => {
    const employees = employeeFactory({}, 5);
    const findAndCountAllRepositorySpy = jest
      .spyOn(employeeRepositoryMock, 'findAndCountAll')
      .mockReturnValue(
        Promise.resolve({
          rows: employees,
          count: employees.length,
        } as unknown as {
          rows: EmployeeModel[];
          count: GroupedCountResultItem[];
        }),
      );
    const response = await sut.findAll({});
    expect(5).toBe(response.count);
    expect(response).toHaveProperty('lastSyncAt');
    expect(findAndCountAllRepositorySpy).toHaveBeenCalledTimes(1);
  });

  it('/{id} >> Get user by id', async () => {
    const employee = employeeFactory({});
    const findOneRepositorySpy = jest
      .spyOn(employeeRepositoryMock, 'findOne')
      .mockReturnValue(Promise.resolve(employee as EmployeeModel));
    const response = await sut.findOne(employee.id);
    expect(response).not.toHaveProperty('password');
    expect(findOneRepositorySpy).toHaveBeenCalledTimes(1);
  });
});
