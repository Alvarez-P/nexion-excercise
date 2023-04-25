import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductCategoryDto {
  @ApiPropertyOptional({
    type: String,
    description: 'name',
    uniqueItems: true,
  })
  @IsOptional()
  @IsString()
  @Length(3)
  name?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'description',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
