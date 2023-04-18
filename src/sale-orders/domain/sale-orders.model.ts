import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { SaleOrder } from './sale-orders.entity';
import { Employee } from 'src/employees/domain/employee.entity';
import { BranchOffice } from 'src/branch-offices/domain/branch-office.entity';
import { EmployeeModel } from 'src/employees/domain/employee.model';
import { BranchOfficeModel } from 'src/branch-offices/domain/branch-office.model';
import { SALE_ORDER_MODEL_NAME } from '../constants';

@Table({ modelName: SALE_ORDER_MODEL_NAME, timestamps: true })
export class SaleOrderModel extends Model<SaleOrder> {
  @PrimaryKey
  @Column
  id: string;

  @Column(DataType.FLOAT)
  total: number;

  @AllowNull
  @Column
  description: string | null;

  @Column
  updatedBy: string;

  @Column
  createdBy: string;

  @AllowNull
  @Column
  deletedBy: string | null;

  @ForeignKey(() => BranchOfficeModel)
  @Column
  branchOfficeId: string;

  @BelongsTo(() => BranchOfficeModel)
  branchOffice: BranchOffice;

  @ForeignKey(() => EmployeeModel)
  @Column
  sellerId: string;

  @BelongsTo(() => EmployeeModel)
  seller: Employee;
}
