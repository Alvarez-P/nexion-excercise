import { IsOptional, IsString, IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Query } from 'src/core/types/query.interface';
import { RangeQueryDateDto } from 'src/core/domain/dto/range-query-date.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { EmployeeFilters } from '../../employee.filters';
import { EmployeeRole } from 'src/core/constants';
import { QueryPaginationDto } from 'src/core/domain/dto/pagination.dto';

export class QueryEmployeesDto
  extends QueryPaginationDto<EmployeeFilters>
  implements Query<EmployeeFilters>
{
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
    type: RangeQueryDateDto,
    description: 'birthday',
    example: {
      from: new Date(),
      to: new Date(),
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryDateDto)
  readonly birthday?: RangeQueryDateDto;

  @ApiPropertyOptional({
    type: String,
    description: 'role',
    example: 'user',
  })
  @IsOptional()
  @IsString()
  readonly role?: EmployeeRole;

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
}
