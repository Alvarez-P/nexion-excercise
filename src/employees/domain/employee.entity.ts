import { BaseEntity } from 'src/core/domain/base.entity';

export class Employee implements BaseEntity {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public birthday: Date,
    public role: 'user' | 'admin',
    public updatedAt: Date,
    public createdAt: Date,
    public deletedAt: Date | null,
    public updatedBy: string,
    public createdBy: string,
    public deletedBy: string | null,
  ) {}
}
