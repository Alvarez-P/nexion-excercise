import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Query } from 'src/core/types/query.interface';
import { RangeQueryDateDto } from 'src/core/domain/dto/range-query-date.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BranchOfficeFilters } from '../../branch-office.filters';

export class QueryBranchOfficeDto implements Query<BranchOfficeFilters> {
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
    'address',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof BranchOfficeFilters;

  @ApiPropertyOptional({
    type: String,
    description: 'sort',
    examples: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  readonly sort?: 'asc' | 'desc';
}
