import {
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
import { SaleFilters } from '../../sale.filters';
import { QueryPaginationDto } from 'src/core/domain/dto/pagination.dto';

export class QuerySalesDto
  extends QueryPaginationDto<SaleFilters>
  implements Query<SaleFilters>
{
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
    type: RangeQueryNumberDto,
    description: 'amount',
    example: {
      from: 0,
      to: 20,
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly amount?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: RangeQueryNumberDto,
    description: 'total',
    example: {
      from: 0,
      to: 20,
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly total?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: String,
    description: 'orderBy',
    example: 'createdAt',
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
}
