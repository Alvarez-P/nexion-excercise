import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  Put,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { BranchOfficesService } from '../application/branch-offices.service';
import { CreateBranchOfficeDto } from '../domain/dto/input/create-branch-office.dto';
import { UpdateBranchOfficeDto } from '../domain/dto/input/update-branch-office.dto';
import { Auth } from 'src/auth/infrastructure/guards/auth.guard';
import { CommonDoc } from 'src/core/infrastructure/decorators/documentation.decorator';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Employee } from 'src/employees/domain/employee.entity';
import { QueryBranchOfficeDto } from '../domain/dto/input/query-branch-office.dto';

@ApiTags('branch-offices')
@Controller('branch-offices')
export class BranchOfficesController {
  constructor(private readonly branchOfficesService: BranchOfficesService) {}

  @Post()
  @Auth('admin')
  @CommonDoc()
  @ApiCreatedResponse({ description: 'Created' })
  create(
    @Body() branchOfficeDto: CreateBranchOfficeDto,
    @Request() req: { user: Employee },
  ) {
    return this.branchOfficesService.create(branchOfficeDto, req.user.id);
  }

  @Get()
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  findAll(@Body() queryDto: QueryBranchOfficeDto) {
    return this.branchOfficesService.findAll(queryDto);
  }

  @Get(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.branchOfficesService.findOne(id);
  }

  @Put(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(204)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() branchOfficeDto: UpdateBranchOfficeDto,
    @Request() req: { user: Employee },
  ) {
    return this.branchOfficesService.update(id, branchOfficeDto, req.user.id);
  }

  @Delete(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(204)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: Employee },
  ) {
    return this.branchOfficesService.remove(id, req.user.id);
  }
}
