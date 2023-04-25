import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/guards/auth.guard';
import { Employee } from '../domain/employee.entity';
import { CreateEmployeeDto } from '../domain/dto/input/create-employee.dto';
import { EmployeesService } from '../application/employees.service';
import { QueryEmployeesDto } from '../domain/dto/input/query-employee.dto';
import { CommonDoc } from 'src/core/infrastructure/decorators/documentation.decorator';
import { UpdateEmployeeDto } from '../domain/dto/input/update-employee.dto';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  @Auth('admin')
  @CommonDoc()
  @ApiCreatedResponse({ description: 'Created' })
  public create(
    @Body() userDto: CreateEmployeeDto,
    @Request() req: { user: Employee },
  ) {
    return this.employeeService.create(userDto, req.user.id);
  }

  @Get()
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  public findAll(@Body() queryDto: QueryEmployeesDto) {
    return this.employeeService.findAll(queryDto);
  }

  @Get(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  public findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(204)
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() employeeDto: UpdateEmployeeDto,
    @Request() req: { user: Employee },
  ) {
    return this.employeeService.update(id, employeeDto, req.user.id);
  }

  @Delete(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(204)
  public remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: Employee },
  ) {
    return this.employeeService.remove(id, req.user.id);
  }
}
