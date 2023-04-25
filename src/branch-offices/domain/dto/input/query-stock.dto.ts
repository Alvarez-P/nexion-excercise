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
import { StockFilters } from 'src/stock/domain/stock.filters';
import { QueryPaginationDto } from 'src/core/domain/dto/pagination.dto';

export class QueryBranchStockDto
  extends QueryPaginationDto<StockFilters>
  implements Query<StockFilters>
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
    description: 'amount',
    format: 'range',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly amount?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: String,
    description: 'orderBy',
    example: 'id',
  })
  @IsOptional()
  @IsIn([
    'id',
    'productId',
    'branchOfficeId',
    'amount',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof StockFilters;
}
