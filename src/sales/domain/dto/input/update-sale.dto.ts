import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateSaleDto {
  @ApiPropertyOptional({
    type: String,
    description: 'productId',
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  productId?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'amount',
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly amount?: number;
}
