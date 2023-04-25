import { IsOptional, IsString, IsIn } from 'class-validator';
import { Query } from 'src/core/types/query.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BranchOfficeFilters } from '../../branch-office.filters';
import { QueryPaginationDto } from 'src/core/domain/dto/pagination.dto';

export class QueryBranchOfficeDto
  extends QueryPaginationDto<BranchOfficeFilters>
  implements Query<BranchOfficeFilters>
{
  @ApiPropertyOptional({
    type: String,
    description: 'name',
    example: 'Branch North',
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'address',
    example: 'Av. 54 North',
  })
  @IsOptional()
  @IsString()
  readonly address?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'orderBy',
    example: 'id',
  })
  @IsOptional()
  @IsIn([
    'id',
    'name',
    'address',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof BranchOfficeFilters;
}
