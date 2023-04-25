import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateSaleOrderDto {
  @ApiProperty({
    type: String,
    description: 'sellerId',
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  sellerId!: string;
}
