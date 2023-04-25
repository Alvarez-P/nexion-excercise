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
import { ProductFilters } from '../../product.filters';
import { RangeQueryDateDto } from 'src/core/domain/dto/range-query-date.dto';

export class QueryProductsDto implements Query<ProductFilters> {
  @ApiPropertyOptional({
    type: String,
    description: 'name',
    example: 'drink',
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'description',
    format: 'uuid',
    example: 'bc68bdba-8ec4-4551-bcb3-e0407f1851fd	',
  })
  @IsOptional()
  @IsUUID()
  readonly categoryId?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'cost',
    format: 'range',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly cost?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: String,
    description: 'price',
    format: 'range',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly price?: RangeQueryNumberDto;

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
    'name',
    'categoryId',
    'cost',
    'price',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof ProductFilters;

  @ApiPropertyOptional({
    type: String,
    description: 'sort',
    examples: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  readonly sort?: 'asc' | 'desc';
}
