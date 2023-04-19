import { IBaseEntity } from 'src/core/domain/base.entity';

export class BranchOffice implements IBaseEntity {
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
