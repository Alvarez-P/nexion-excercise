import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PassportModule } from '@nestjs/passport';
import { EmployeesController } from 'src/employees/infrastructure/employees.controller';
import { EmployeesService } from 'src/employees/application/employees.service';
import { EncryptionService } from 'src/core/application/encryption.service';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { generateToken } from 'test/helpers/generate-token';
import { MockRepositoryFactory } from 'test/helpers/repository';
import {
  createEmployeeDtoFactory,
  employeeFactory,
} from 'test/helpers/entities-factory';
import { Employee } from 'src/employees/domain/employee.entity';
import { EMPLOYEE_REPOSITORY } from 'src/employees/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenPayload } from 'src/auth/types/token-payload.interface';
import { DB_MANAGER } from 'src/core/constants';
import { TransactionManagerMock } from 'test/helpers/transaction-manager';
import { LOG_REPOSITORY } from 'src/logs/constants';
import { Log } from 'src/logs/domain/log.entity';
import { JwtStrategy } from 'src/auth/application/strategy/jwt.strategy';
import { LogProvider } from 'src/logs/infrastructure/interceptors/log.provider';

describe('EmployeeModule /employees', () => {
  let app: INestApplication;
  let token: string;
  let admin: Employee;
  let employees: Employee[];
  beforeAll(async () => {
    admin = employeeFactory({});
    employees = employeeFactory({ role: 'user' }, 5);
    const EmployeeRepositoryMock = {
      provide: EMPLOYEE_REPOSITORY,
      useValue: MockRepositoryFactory<Employee>(employees),
    };
    const LogRepositoryMock = {
      provide: LOG_REPOSITORY,
      useValue: MockRepositoryFactory<Log>([]),
    };
    const TransactionProviderMock = {
      provide: DB_MANAGER,
      useClass: TransactionManagerMock,
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule,
      ],
      providers: [
        EmployeesService,
        EncryptionService,
        QueryBuilder,
        EmployeeRepositoryMock,
        ConfigService,
        TransactionProviderMock,
        LogRepositoryMock,
        JwtStrategy,
        LogProvider,
      ],
      controllers: [EmployeesController],
    }).compile();
    const tokenPayload: TokenPayload = {
      sub: admin.id,
      userName: admin.userName,
      role: admin.role,
      token_type: 'access_token',
    };
    token = generateToken(tokenPayload);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ >> Add new user', async () => {
    const createEmployeeDto = createEmployeeDtoFactory({ userName: 'alvarez' });
    const response = await request(app.getHttpServer())
      .post('/employees')
      .set('Authorization', `Bearer ${token}`)
      .send(createEmployeeDto);
    expect(201).toBe(response.statusCode);
    expect(response.body).not.toHaveProperty('password');
  });

  it('/ >> Unauthorized to add employee', async () => {
    const createEmployeeDto = createEmployeeDtoFactory({});
    const response = await request(app.getHttpServer())
      .post('/employees')
      .send(createEmployeeDto);
    expect(401).toBe(response.statusCode);
    expect(response.body).toHaveProperty('message');
  });

  it('/ >> Get all employees', async () => {
    const response = await request(app.getHttpServer())
      .post('/employees/searcher')
      .set('Authorization', `Bearer ${token}`);
    expect(200).toBe(response.statusCode);
    expect(5).toBe(response.body.count);
    expect(response.body.items[0]).not.toHaveProperty('password');
  });

  it('/{id} >> Get user by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/employees/${employees[0].id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(200).toBe(response.statusCode);
    expect(response.body.item).not.toHaveProperty('password');
  });
});
