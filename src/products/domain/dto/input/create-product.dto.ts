import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'name',
    uniqueItems: true,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3)
  name!: string;

  @ApiProperty({
    type: String,
    description: 'categoryId',
    format: 'uuid',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  categoryId!: string;

  @ApiProperty({
    type: Number,
    description: 'cost',
    example: 20,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly cost!: number;

  @ApiProperty({
    type: Number,
    description: 'price',
    example: 20,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly price!: number;
}
