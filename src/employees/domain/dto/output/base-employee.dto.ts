import { Exclude } from 'class-transformer';
import { EmployeeRole } from 'src/core/constants';

export class BaseEmployeeDto {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  role: EmployeeRole;
  updatedAt: string;
  createdAt: string;
  updatedBy: string;
  createdBy: string;
  deletedAt: string | null;
  deletedBy: string | null;

  @Exclude()
  password: string;
}
