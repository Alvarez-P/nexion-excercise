import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { RangeQueryDate } from 'src/core/types/query.interface';

export class RangeQueryDateDto implements RangeQueryDate {
  @ApiPropertyOptional({
    format: 'date',
    type: Date,
    description: 'from',
    example: new Date().toISOString(),
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly from?: Date;

  @ApiPropertyOptional({
    format: 'date',
    type: Date,
    description: 'to',
    example: new Date().toISOString(),
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly to?: Date;
}
