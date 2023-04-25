import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSaleOrderDto {
  @ApiProperty({
    type: String,
    description: 'branchOfficeId',
    format: 'uuid',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  branchOfficeId!: string;
}
