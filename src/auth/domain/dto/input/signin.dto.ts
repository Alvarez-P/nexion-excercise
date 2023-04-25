import { ApiProperty } from '@nestjs/swagger';

export class RequestSignInDto {
  @ApiProperty({
    type: String,
    description: 'userName',
    required: true,
    example: 'nexion',
  })
  userName: string;

  @ApiProperty({
    type: String,
    description: 'userName',
    required: true,
    maxLength: 8,
    minLength: 8,
    example: 'nexion2023*',
  })
  password: string;
}
