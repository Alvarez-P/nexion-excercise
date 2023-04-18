import { PRODUCT_CATEGORY_REPOSITORY } from '../constants';
import { ProductCategoryModel } from '../domain/product-category.model';

export const ProductCategoryRepository = {
  provide: PRODUCT_CATEGORY_REPOSITORY,
  useValue: ProductCategoryModel,
};
