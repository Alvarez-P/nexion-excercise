import { Stock } from './stock.entity';

export type StockFilters = Omit<Stock, 'deletedAt' | 'deletedBy'>;
