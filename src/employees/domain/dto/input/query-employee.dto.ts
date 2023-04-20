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
import { EmployeeFilters } from '../../employee.filters';
import { EmployeeRole } from 'src/core/constants';

export class QueryEmployeesDto implements Query<EmployeeFilters> {
  @ApiPropertyOptional({
    type: String,
    description: 'userName',
    example: 'nexion',
  })
  @IsString()
  @IsOptional()
  readonly userName?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'firstName',
    example: 'Nexion',
  })
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'lastName',
    example: 'Solutions',
  })
  @IsOptional()
  @IsString()
  readonly lastName?: string;

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
    description: 'birthday',
    format: 'range',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryDateDto)
  readonly birthday?: RangeQueryDateDto;

  @ApiPropertyOptional({
    type: String,
    description: 'role',
    examples: ['user', 'admin'],
  })
  @IsOptional()
  @IsString()
  readonly role?: EmployeeRole;

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
    'userName',
    'firstName',
    'lastName',
    'role',
    'birthday',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof EmployeeFilters;

  @ApiPropertyOptional({
    type: String,
    description: 'sort',
    examples: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  readonly sort?: 'asc' | 'desc';
}
