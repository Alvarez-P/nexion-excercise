import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, IsString, Length } from 'class-validator';
import { EmployeeRole } from 'src/core/constants';

export class CreateEmployeeDto {
  @ApiProperty({
    type: String,
    description: 'username',
    uniqueItems: true,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  userName!: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8)
  password!: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'firstName',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  firstName!: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'lastName',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  lastName!: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'lastName',
    examples: ['user', 'admin'],
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['user', 'admin'])
  role!: EmployeeRole;

  @ApiProperty({
    format: 'date',
    type: Date,
    description: 'birthday',
    example: new Date().toISOString(),
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly birthday?: Date;
}
