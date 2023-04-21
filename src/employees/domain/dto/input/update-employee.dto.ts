import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsOptional, IsString, Length } from 'class-validator';
import { EmployeeRole } from 'src/core/constants';

export class UpdateEmployeeDto {
  @ApiPropertyOptional({
    type: String,
    description: 'userName',
  })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiPropertyOptional({
    required: true,
    type: String,
    description: 'password',
  })
  @IsOptional()
  @IsString()
  @Length(8)
  password?: string;

  @ApiPropertyOptional({
    required: true,
    type: String,
    description: 'firstName',
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  firstName?: string;

  @ApiPropertyOptional({
    required: true,
    type: String,
    description: 'lastName',
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  lastName?: string;

  @ApiPropertyOptional({
    required: true,
    type: String,
    description: 'lastName',
    examples: ['user', 'admin'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['user', 'admin'])
  role?: EmployeeRole;

  @ApiPropertyOptional({
    format: 'date',
    type: Date,
    description: 'birthday',
    example: new Date().toISOString(),
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly birthday?: Date;
}
