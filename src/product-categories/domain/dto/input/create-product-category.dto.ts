import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProductCategoryDto {
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

  @ApiPropertyOptional({
    required: true,
    type: String,
    description: 'description',
  })
  @IsNotEmpty()
  @IsString()
  description?: string;
}
