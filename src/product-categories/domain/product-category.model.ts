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
import { Product } from 'src/products/domain/product.entity';
import { ProductCategory } from './product-category.entity';
import { ProductModel } from 'src/products/domain/product.model';
import { PRODUCT_CATEGORY_MODEL_NAME } from '../constants';

@Table({ modelName: PRODUCT_CATEGORY_MODEL_NAME, paranoid: true })
export class ProductCategoryModel extends Model<ProductCategory> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

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

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @HasMany(() => ProductModel)
  category: Product[];
}
