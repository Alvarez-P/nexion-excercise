import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  ParseUUIDPipe,
  HttpCode,
  Request,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { LogsService } from '../application/logs.service';
import { QueryLogsDto } from '../domain/dto/input/query-logs.dto';
import { Auth } from 'src/auth/infrastructure/decorators/auth.decorator';
import { CommonDoc } from 'src/core/infrastructure/decorators/documentation.decorator';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from 'src/employees/domain/employee.entity';
import { LoggingInterceptor } from './interceptors/log.interceptor';

@ApiTags('logs')
@Controller('logs')
@UseInterceptors(LoggingInterceptor)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post('searcher')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  @HttpCode(200)
  findAll(@Body() queryDto: QueryLogsDto) {
    return this.logsService.findAll(queryDto);
  }

  @Get(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.logsService.findOne(id);
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
    return this.logsService.remove(id, req.user.id);
  }
}
