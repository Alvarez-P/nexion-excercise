import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { EncryptionService } from 'src/core/application/encryption.service';
import { EMPLOYEE_REPOSITORY } from 'src/employees/constants';
import { EmployeeBuilder } from 'src/employees/domain/employee.builder';
import { Employee } from 'src/employees/domain/employee.entity';
import { TEmployeeRepository } from 'src/employees/infrastructure/employees.repository';

@Injectable()
export class SeedEmployee implements Seeder {
  constructor(
    private encryptionService: EncryptionService,
    @Inject(EMPLOYEE_REPOSITORY)
    private employeeRepository: TEmployeeRepository,
  ) {}

  async seed() {
    const hashedPassword = this.encryptionService.encrypt('nexion2023*');
    const admin = new EmployeeBuilder()
      .userName('nexion')
      .createdBy('root')
      .updatedBy('root')
      .firstName('Nexion')
      .lastName('Solutions')
      .password(hashedPassword)
      .role('admin')
      .deletedAt(null)
      .build();
    const records: Employee[] = [admin];
    return this.employeeRepository.bulkCreate(records);
  }

  async drop(): Promise<any> {
    return this.employeeRepository.destroy({});
  }
}
