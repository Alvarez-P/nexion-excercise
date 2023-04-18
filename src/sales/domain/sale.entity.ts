import { BaseEntity } from 'src/core/domain/base.entity';
import { SaleOrder } from 'src/sale-orders/domain/sale-orders.entity';
import { Product } from 'src/products/domain/product.entity';

export class Sale implements BaseEntity {
  constructor(
    public id: string,
    public product: Product,
    public order: SaleOrder,
    public amount: number,
    public total: number,
    public updatedAt: Date,
    public createdAt: Date,
    public deletedAt: Date | null,
    public updatedBy: string,
    public createdBy: string,
    public deletedBy: string | null,
  ) {}
}
