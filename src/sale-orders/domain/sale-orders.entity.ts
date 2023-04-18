import { BranchOffice } from 'src/branch-offices/domain/branch-office.entity';
import { BaseEntity } from 'src/core/domain/base.entity';
import { Employee } from 'src/employees/domain/employee.entity';

export class SaleOrder implements BaseEntity {
  constructor(
    public id: string,
    public branchOffice: BranchOffice,
    public seller: Employee,
    public total: number,
    public updatedAt: Date,
    public createdAt: Date,
    public deletedAt: Date | null,
    public updatedBy: string,
    public createdBy: string,
    public deletedBy: string | null,
  ) {}
}
