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
import { Product } from './product.entity';
import { ProductCategory } from 'src/product-categories/domain/product-category.entity';
import { ProductCategoryModel } from 'src/product-categories/domain/product-category.model';
import { PRODUCT_MODEL_NAME } from '../constants';

@Table({ modelName: PRODUCT_MODEL_NAME, timestamps: true })
export class ProductModel extends Model<Product> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column(DataType.FLOAT)
  cost: number;

  @Column(DataType.FLOAT)
  price: number;

  @Column
  updatedBy: string;

  @Column
  createdBy: string;

  @AllowNull
  @Column
  deletedBy: string | null;

  @ForeignKey(() => ProductCategoryModel)
  @Column
  categoryId: string;

  @BelongsTo(() => ProductCategoryModel)
  category: ProductCategory;
}
