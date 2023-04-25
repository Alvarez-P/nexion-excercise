import { ProductCategory } from './product-category.entity';

export type ProductCategoryFilters = Omit<
  ProductCategory,
  'deletedAt' | 'deletedBy'
>;
