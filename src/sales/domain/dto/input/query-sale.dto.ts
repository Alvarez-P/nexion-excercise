import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Query } from 'src/core/types/query.interface';
import { RangeQueryNumberDto } from 'src/core/domain/dto/range-query-number.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RangeQueryDateDto } from 'src/core/domain/dto/range-query-date.dto';
import { SaleFilters } from '../../sale.filters';

export class QuerySalesDto implements Query<SaleFilters> {
  @ApiPropertyOptional({
    type: String,
    description: 'productId',
    format: 'uuid',
    example: 'bc68bdba-8ec4-4551-bcb3-e0407f1851fd	',
  })
  @IsOptional()
  @IsUUID()
  readonly productId?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'saleOrderId',
    format: 'uuid',
    example: 'bc68bdba-8ec4-4551-bcb3-e0407f1851fd	',
  })
  @IsOptional()
  @IsUUID()
  readonly saleOrderId?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'amount',
    format: 'range',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly amount?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: String,
    description: 'total',
    format: 'range',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly total?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: String,
    description: 'createdBy',
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  readonly createdBy?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'updatedBy',
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  readonly updatedBy?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'createdAt',
    format: 'range',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryDateDto)
  readonly createdAt?: RangeQueryDateDto;

  @ApiPropertyOptional({
    type: String,
    description: 'updatedAt',
    format: 'range',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryDateDto)
  readonly updatedAt?: RangeQueryDateDto;

  @ApiPropertyOptional({
    type: Number,
    description: 'offset',
    example: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly offset?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'limit',
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly limit?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'orderBy',
    example: 'orderBy',
  })
  @IsOptional()
  @IsIn([
    'id',
    'productId',
    'saleOrderId',
    'amount',
    'total',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof SaleFilters;

  @ApiPropertyOptional({
    type: String,
    description: 'sort',
    examples: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  readonly sort?: 'asc' | 'desc';
}
