import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PassportModule } from '@nestjs/passport';
import { EncryptionService } from 'src/core/application/encryption.service';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { MockRepositoryFactory } from 'test/helpers/repository';
import { employeeFactory } from 'test/helpers/entities-factory';
import { Employee } from 'src/employees/domain/employee.entity';
import { EMPLOYEE_REPOSITORY } from 'src/employees/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LOG_REPOSITORY } from 'src/logs/constants';
import { Log } from 'src/logs/domain/log.entity';
import { JwtStrategy } from 'src/auth/application/strategy/jwt.strategy';
import { LogProvider } from 'src/logs/infrastructure/interceptors/log.provider';
import { DB_MANAGER } from 'src/core/constants';
import { TransactionManagerMock } from 'test/helpers/transaction-manager';
import { AuthController } from 'src/auth/infrastructure/auth.controller';
import { AuthService } from 'src/auth/application/auth.service';
import { LocalStrategy } from 'src/auth/application/strategy/local.strategy';
import { JwtService } from '@nestjs/jwt';

describe('EmployeeModule /employees', () => {
  let app: INestApplication;
  let admin: Employee;
  beforeAll(async () => {
    admin = employeeFactory({ password: 'aeAP1998_' });
    const employees = employeeFactory({ id: admin.id }, 1);
    const MockEmployeeRepository = {
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
        AuthService,
        QueryBuilder,
        MockEmployeeRepository,
        ConfigService,
        LogRepositoryMock,
        JwtService,
        LogProvider,
        TransactionProviderMock,
        EncryptionService,
        JwtStrategy,
        LocalStrategy,
      ],
      controllers: [AuthController],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/signin >> Signin', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ userName: admin.userName, password: admin.password });
    expect(200).toBe(response.statusCode);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('refresh_token');
  });

  it('/signin >> Unauthorized', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ userName: admin.userName, password: 'bad-password' });
    expect(401).toBe(response.statusCode);
  });
});
