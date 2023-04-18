import { BaseEntity } from 'src/core/domain/base.entity';

export class BranchOffice implements BaseEntity {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public updatedAt: Date,
    public createdAt: Date,
    public deletedAt: Date | null,
    public updatedBy: string,
    public createdBy: string,
    public deletedBy: string | null,
  ) {}
}
