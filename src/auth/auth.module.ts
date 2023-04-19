import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { AuthController } from './infrastructure/auth.controller';
import { EmployeeRepository } from 'src/employees/infrastructure/employees.repository';
import { CoreModule } from 'src/core/core.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CoreModule, ConfigModule],
  providers: [AuthService, EmployeeRepository, ConfigService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
