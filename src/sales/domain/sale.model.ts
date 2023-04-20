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
import { Sale } from './sale.entity';
import { ProductModel } from 'src/products/domain/product.model';
import { SaleOrder } from 'src/sale-orders/domain/sale-orders.entity';
import { Product } from 'src/products/domain/product.entity';
import { SaleOrderModel } from 'src/sale-orders/domain/sale-orders.model';
import { SALE_MODEL_NAME } from '../constants';

@Table({ modelName: SALE_MODEL_NAME, paranoid: true })
export class SaleModel extends Model<Sale> {
  @PrimaryKey
  @Column
  id: string;

  @Column(DataType.INTEGER)
  amount: number;

  @Column(DataType.FLOAT)
  total: number;

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

  @ForeignKey(() => SaleOrderModel)
  @Column
  saleOrderId: string;

  @BelongsTo(() => SaleOrderModel)
  saleOrder: SaleOrder;

  @ForeignKey(() => ProductModel)
  @Column
  productId: string;

  @BelongsTo(() => ProductModel)
  product: Product;
}
