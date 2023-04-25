import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    type: String,
    description: 'name',
    uniqueItems: true,
  })
  @IsOptional()
  @IsString()
  @Length(3)
  name!: string;

  @ApiPropertyOptional({
    type: String,
    description: 'categoryId',
    format: 'uuid',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  categoryId!: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'cost',
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly cost!: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'price',
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly price!: number;
}
