import { Sale } from './sale.entity';

export type SaleFilters = Omit<Sale, 'deletedAt' | 'deletedBy'>;
