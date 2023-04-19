import { Body, Controller, Post, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Auth } from 'src/core/infrastructure/guards/auth.guard';
import { Employee } from '../domain/employee.entity';
import { CreateEmployeeDto } from '../dto/input/create-employee.dto';
import { EmployeesService } from '../application/employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  @Auth('admin')
  @ApiBearerAuth('Bearer')
  @ApiCreatedResponse({ description: 'Created Successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  public create(
    @Body() userDto: CreateEmployeeDto,
    @Request() req: { user: Employee },
  ) {
    return this.employeeService.create(userDto, req.user.id);
  }
}
