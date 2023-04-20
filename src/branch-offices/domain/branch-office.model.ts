import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AllowNull,
  HasMany,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';
import { BranchOffice } from './branch-office.entity';
import { StockModel } from 'src/stock/domain/stock.model';
import { Stock } from 'src/stock/domain/stock.entity';
import { SaleOrderModel } from 'src/sale-orders/domain/sale-orders.model';
import { SaleOrder } from 'src/sale-orders/domain/sale-orders.entity';
import { BRANCH_OFFICE_MODEL_NAME } from '../constants';

@Table({ modelName: BRANCH_OFFICE_MODEL_NAME, paranoid: true })
export class BranchOfficeModel extends Model<BranchOffice> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  address: string;

  @Column
  updatedBy: string;

  @Column
  createdBy: string;

  @AllowNull
  @Column
  deletedBy: string | null;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @HasMany(() => StockModel)
  stocks: Stock[];

  @HasMany(() => SaleOrderModel)
  orders: SaleOrder[];
}
