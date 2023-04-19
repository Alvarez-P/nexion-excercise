import { seeder } from 'nestjs-seeder';
import { CoreModule } from 'src/core/core.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeeRepository } from 'src/employees/infrastructure/employees.repository';
import { SeedEmployee } from './employee.seed';

seeder({
  imports: [CoreModule, ConfigModule.forRoot()],
  providers: [ConfigService, EmployeeRepository],
}).run([SeedEmployee]);
