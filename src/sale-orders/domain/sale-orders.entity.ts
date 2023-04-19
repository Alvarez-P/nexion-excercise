import { BranchOffice } from 'src/branch-offices/domain/branch-office.entity';
import { IBaseEntity } from 'src/core/domain/base.entity';
import { Employee } from 'src/employees/domain/employee.entity';

export class SaleOrder implements IBaseEntity {
  constructor(
    public id: string,
    public branchOfficeId: string,
    public branchOffice: BranchOffice,
    public sellerId: string,
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
