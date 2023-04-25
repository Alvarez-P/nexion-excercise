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
import { LogFilters } from '../../logs.filters';
import { QueryPaginationDto } from 'src/core/domain/dto/pagination.dto';

export class QueryLogsDto
  extends QueryPaginationDto<LogFilters>
  implements Query<LogFilters>
{
  @ApiPropertyOptional({
    type: String,
    description: 'request_action',
    example: 'POST',
  })
  @IsString()
  @IsOptional()
  readonly request_action?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'request_path',
    example: 'POST',
  })
  @IsString()
  @IsOptional()
  readonly request_path?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'response_code',
    example: 200,
  })
  @IsString()
  @IsOptional()
  readonly response_code?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'employeeId',
    format: 'uuid',
    example: 'bc68bdba-8ec4-4551-bcb3-e0407f1851fd	',
  })
  @IsOptional()
  @IsUUID()
  readonly employeeId?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'elapsed_time',
    format: 'range',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryNumberDto)
  readonly elapsed_time?: RangeQueryNumberDto;

  @ApiPropertyOptional({
    type: String,
    description: 'ip_address',
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  readonly ip_address?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'orderBy',
    example: 'id',
  })
  @IsOptional()
  @IsIn([
    'id',
    'elapsed_time',
    'ip_address',
    'employeeId',
    'request_action',
    'response_code',
    'createdAt',
    'updatedAt',
    'updatedBy',
    'createdBy',
  ])
  @IsString()
  readonly orderBy?: keyof LogFilters;
}
