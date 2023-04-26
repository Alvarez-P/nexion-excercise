import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/core/application/encryption.service';
import { EMPLOYEE_REPOSITORY } from 'src/employees/constants';
import { Employee } from 'src/employees/domain/employee.entity';
import { TEmployeeRepository } from 'src/employees/infrastructure/employees.repository';
import { TokenPayload } from '../types/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private employeeRepository: TEmployeeRepository,
    private encryptionService: EncryptionService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async matchCredentials(userName: string, password: string) {
    const employee = await this.employeeRepository.findOne({
      where: { userName },
    });
    if (!employee) return null;
    const matched = this.encryptionService.compare(password, employee.password);
    return matched ? employee : null;
  }

  signin(employee: Employee) {
    const payload: TokenPayload = {
      sub: employee.id,
      role: employee.role,
      userName: employee.userName,
      token_type: 'access_token',
    };
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXPIRATION');
    const refreshExpiresIn = this.configService.get('JWT_REFRESH_EXPIRATION');
    const access_token = this.jwtService.sign(payload, { secret, expiresIn });
    const refresh_token = this.jwtService.sign(
      { ...payload, token_type: 'refresh_token' },
      { secret, expiresIn: refreshExpiresIn },
    );
    return { access_token, refresh_token };
  }

  refresh(employee: Employee) {
    const payload: TokenPayload = {
      sub: employee.id,
      role: employee.role,
      userName: employee.userName,
      token_type: 'access_token',
    };
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXPIRATION');
    const access_token = this.jwtService.sign(payload, { secret, expiresIn });
    return { access_token };
  }
}
