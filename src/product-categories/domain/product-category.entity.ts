import { IBaseEntity } from 'src/core/domain/base.entity';

export class ProductCategory implements IBaseEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string | null,
    public updatedAt: Date,
    public createdAt: Date,
    public deletedAt: Date | null,
    public updatedBy: string,
    public createdBy: string,
    public deletedBy: string | null,
  ) {}
}
