import { PRODUCT_REPOSITORY } from '../constants';
import { ProductModel } from '../domain/product.model';

export const ProductRepository = {
  provide: PRODUCT_REPOSITORY,
  useValue: ProductModel,
};
