import { SaleOrder } from './sale-orders.entity';

export type SaleOrderFilters = Omit<SaleOrder, 'deletedAt' | 'deletedBy'>;
