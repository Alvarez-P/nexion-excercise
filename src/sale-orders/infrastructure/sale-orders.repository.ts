import { SALE_ORDER_REPOSITORY } from '../constants';
import { SaleOrderModel } from '../domain/sale-orders.model';

export const SaleOrderRepository = {
  provide: SALE_ORDER_REPOSITORY,
  useValue: SaleOrderModel,
};

export type TSaleOrderRepository = typeof SaleOrderModel;
