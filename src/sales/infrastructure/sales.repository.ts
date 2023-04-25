import { SALE_REPOSITORY } from '../constants';
import { SaleModel } from '../domain/sale.model';

export const SaleRepository = {
  provide: SALE_REPOSITORY,
  useValue: SaleModel,
};

export type TSaleRepository = typeof SaleModel;
