import { Type } from 'class-transformer';
import { BaseBranchOfficeDto } from 'src/branch-offices/domain/dto/output/base-branch-office.dto';
import { SaleOrderStatus } from 'src/core/constants';
import { BaseEmployeeDto } from 'src/employees/domain/dto/output/base-employee.dto';

export class BaseSaleOrderDto {
  id: string;
  branchOfficeId: string;
  sellerId: string;
  total: number;
  status: SaleOrderStatus;
  updatedAt: string;
  createdAt: string;
  updatedBy: string;
  createdBy: string;
  deletedAt: string | null;
  deletedBy: string | null;

  @Type(() => BaseBranchOfficeDto)
  branchOffice: BaseBranchOfficeDto;
  @Type(() => BaseEmployeeDto)
  seller: BaseEmployeeDto;
}
