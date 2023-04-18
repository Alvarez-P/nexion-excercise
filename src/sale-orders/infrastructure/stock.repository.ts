import { SALE_ORDER_REPOSITORY } from '../constants';
import { SaleOrderModel } from '../domain/sale-orders.model';

export const SaleOrderModelRepository = {
  provide: SALE_ORDER_REPOSITORY,
  useValue: SaleOrderModel,
};
