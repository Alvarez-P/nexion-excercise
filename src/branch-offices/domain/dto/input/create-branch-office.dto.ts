import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBranchOfficeDto {
  @ApiProperty({
    type: String,
    description: 'address',
    uniqueItems: true,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address!: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'name',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3)
  name!: string;
}
