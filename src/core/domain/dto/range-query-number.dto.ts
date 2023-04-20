import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { RangeQueryNumber } from 'src/core/types/query.interface';

export class RangeQueryDateDto implements RangeQueryNumber {
  @ApiPropertyOptional({
    type: Number,
    description: 'from',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  readonly from?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'to',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  readonly to?: number;
}
