import { Type } from 'class-transformer';
import { BaseBranchOfficeDto } from 'src/branch-offices/domain/dto/output/base-branch-office.dto';
import { BaseProductDto } from 'src/products/domain/dto/output/base-product.dto';

export class BaseStockDto {
  id: string;
  productId: string;
  branchOfficeId: string;
  amount: number;
  updatedAt: string;
  createdAt: string;
  updatedBy: string;
  createdBy: string;
  deletedAt: string | null;
  deletedBy: string | null;

  @Type(() => BaseProductDto)
  product: BaseProductDto;
  @Type(() => BaseBranchOfficeDto)
  branchOffice: BaseBranchOfficeDto;
}
