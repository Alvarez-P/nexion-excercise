import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty({
    type: String,
    description: 'productId',
    format: 'uuid',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId!: string;

  @ApiProperty({
    type: String,
    description: 'saleOrderId',
    format: 'uuid',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  saleOrderId!: string;

  @ApiProperty({
    type: Number,
    description: 'amount',
    example: 20,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly amount!: number;
}
