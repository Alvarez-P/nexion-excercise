import { Product } from './product.entity';

export type ProductFilters = Omit<Product, 'deletedAt' | 'deletedBy'>;
