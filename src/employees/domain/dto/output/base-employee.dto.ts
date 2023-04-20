import { Exclude } from 'class-transformer';
import { EmployeeRole } from 'src/core/constants';

export class BaseEmployeeDto {
  id: string | undefined;
  userName: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  role: EmployeeRole;
  updatedAt: string;
  createdAt: string;
  updatedBy: string;
  createdBy: string;

  @Exclude()
  password: string;
  @Exclude()
  deletedAt: string | null;
  @Exclude()
  deletedBy: string | null;
}
