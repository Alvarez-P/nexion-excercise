import {
  IsInt,
  IsOptional,
  IsString,
  IsIn,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CommonQuery } from 'src/core/types/query.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RangeQueryDateDto } from 'src/core/domain/dto/range-query-date.dto';

export class QueryPaginationDto<T> implements CommonQuery<T> {
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
    type: RangeQueryDateDto,
    description: 'createdAt',
    example: {
      from: new Date(),
      to: new Date(),
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeQueryDateDto)
  readonly createdAt?: RangeQueryDateDto;

  @ApiPropertyOptional({
    type: RangeQueryDateDto,
    description: 'updatedAt',
    example: {
      from: new Date(),
      to: new Date(),
    },
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
    description: 'sort',
    example: 'desc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  readonly sort?: 'asc' | 'desc';
}
