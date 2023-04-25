import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBranchOfficeDto {
  @ApiPropertyOptional({
    type: String,
    description: 'address',
    uniqueItems: true,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'name',
  })
  @IsOptional()
  @IsString()
  @Length(3)
  name?: string;
}
