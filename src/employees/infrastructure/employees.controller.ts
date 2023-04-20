import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/guards/auth.guard';
import { Employee } from '../domain/employee.entity';
import { CreateEmployeeDto } from '../domain/dto/input/create-employee.dto';
import { EmployeesService } from '../application/employees.service';
import { QueryEmployeesDto } from '../domain/dto/input/query-employee.dto';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  @Auth('admin')
  @ApiBearerAuth('Bearer')
  @ApiCreatedResponse({ description: 'Created Successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiForbiddenResponse({ description: 'Forbidden Request' })
  public create(
    @Body() userDto: CreateEmployeeDto,
    @Request() req: { user: Employee },
  ) {
    return this.employeeService.create(userDto, req.user.id);
  }

  @Get()
  @Auth('admin')
  @ApiBearerAuth('Bearer')
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiForbiddenResponse({ description: 'Forbidden Request' })
  public find(@Body() queryDto: QueryEmployeesDto) {
    return this.employeeService.find(queryDto);
  }
}
