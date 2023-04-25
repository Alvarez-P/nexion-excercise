import { IsOptional, IsString, IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Query } from 'src/core/types/query.interface';
import { RangeQueryNumberDto } from 'src/core/domain/dto/range-query-number.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SaleOrderFilters } from 'src/sale-orders/domain/sale-orders.filters';
import { QueryPaginationDto } from 'src/core/domain/dto/pagination.dto';

export class QueryBranchSaleOrdersDto
  extends QueryPaginationDto<SaleOrderFilters>
  implements Query<SaleOrderFilters>
{
  @ApiPropertyOptional({
    type: String,
    description: 'sort',
    examples: ['pending', 'paid', 'cancelled'],
  })
  @IsOptional()
  @IsIn(['pending', 'paid', 'cancelled'])
  readonly status?: 'pending' | 'paid' | 'cancelled';

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
    description: 'orderBy',
    example: 'orderBy',
  })
  @IsOptional()
  @IsIn([
    'id',
    'branchOfficeId',
    'sellerId',
    'total',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof SaleOrderFilters;
}
