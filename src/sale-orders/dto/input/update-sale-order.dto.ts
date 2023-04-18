import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-sale-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
