import { STOCK_REPOSITORY } from '../constants';
import { StockModel } from '../domain/stock.model';

export const StockRepository = {
  provide: STOCK_REPOSITORY,
  useValue: StockModel,
};
