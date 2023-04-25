import { IsOptional, IsString, IsIn } from 'class-validator';
import { Query } from 'src/core/types/query.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductCategoryFilters } from '../../product-category.filters';
import { QueryPaginationDto } from 'src/core/domain/dto/pagination.dto';

export class QueryProductCategoriesDto
  extends QueryPaginationDto<ProductCategoryFilters>
  implements Query<ProductCategoryFilters>
{
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
    example: 'Nexion',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'orderBy',
    example: 'id',
  })
  @IsOptional()
  @IsIn([
    'id',
    'name',
    'description',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof ProductCategoryFilters;
}
