import { BranchOffice } from 'src/branch-offices/domain/branch-office.entity';
import { Product } from 'src/products/domain/product.entity';

export class Stock {
  constructor(
    public id: string,
    public name: string,
    public branchOffice: BranchOffice,
    public product: Product,
    public amount: number,
    public updatedAt: Date,
    public createdAt: Date,
    public deletedAt: Date | null,
    public updatedBy: string,
    public createdBy: string,
    public deletedBy: string | null,
  ) {}
}
