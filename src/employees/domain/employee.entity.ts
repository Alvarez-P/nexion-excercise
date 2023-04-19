import { EmployeeRole } from 'src/core/constants';
import { IBaseEntity } from 'src/core/domain/base.entity';

export class Employee implements IBaseEntity {
  constructor(
    public id: string,
    public userName: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public birthday: Date,
    public role: EmployeeRole,
    public updatedAt: Date,
    public createdAt: Date,
    public deletedAt: Date | null,
    public updatedBy: string,
    public createdBy: string,
    public deletedBy: string | null,
  ) {}
}
