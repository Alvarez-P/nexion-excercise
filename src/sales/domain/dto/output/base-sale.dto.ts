import { Type } from 'class-transformer';
import { BaseProductDto } from 'src/products/domain/dto/output/base-product.dto';
import { BaseSaleOrderDto } from 'src/sale-orders/domain/dto/output/base-sale-orders.dto';

export class BaseSaleDto {
  id: string;
  productId: string;
  saleOrderId: string;
  amount: number;
  total: number;
  updatedAt: string;
  createdAt: string;
  updatedBy: string;
  createdBy: string;
  deletedAt: string | null;
  deletedBy: string | null;

  @Type(() => BaseProductDto)
  product: BaseProductDto;
  @Type(() => BaseSaleOrderDto)
  saleOrder: BaseSaleOrderDto;
}
