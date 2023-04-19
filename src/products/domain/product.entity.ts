import { IBaseEntity } from 'src/core/domain/base.entity';
import { ProductCategory } from 'src/product-categories/domain/product-category.entity';

export class Product implements IBaseEntity {
  constructor(
    public id: string,
    public name: string,
    public categoryId: string,
    public category: ProductCategory,
    public cost: number,
    public price: number,
    public updatedAt: Date,
    public createdAt: Date,
    public deletedAt: Date | null,
    public updatedBy: string,
    public createdBy: string,
    public deletedBy: string | null,
  ) {}
}
