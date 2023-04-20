import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  AllowNull,
  BelongsTo,
  ForeignKey,
  DeletedAt,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';
import { Stock } from './stock.entity';
import { BranchOffice } from 'src/branch-offices/domain/branch-office.entity';
import { Product } from 'src/products/domain/product.entity';
import { ProductModel } from 'src/products/domain/product.model';
import { BranchOfficeModel } from 'src/branch-offices/domain/branch-office.model';
import { STOCK_MODEL_NAME } from '../constants';

@Table({ modelName: STOCK_MODEL_NAME, paranoid: true })
export class StockModel extends Model<Stock> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column(DataType.INTEGER)
  amount: number;

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

  @ForeignKey(() => BranchOfficeModel)
  @Column
  branchOfficeId: string;

  @BelongsTo(() => BranchOfficeModel)
  branchOffice: BranchOffice;

  @ForeignKey(() => ProductModel)
  @Column
  productId: string;

  @BelongsTo(() => ProductModel)
  product: Product;
}
