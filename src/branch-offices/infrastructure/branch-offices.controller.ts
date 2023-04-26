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
  UseInterceptors,
} from '@nestjs/common';
import { BranchOfficesService } from '../application/branch-offices.service';
import { CreateBranchOfficeDto } from '../domain/dto/input/create-branch-office.dto';
import { UpdateBranchOfficeDto } from '../domain/dto/input/update-branch-office.dto';
import { Auth } from 'src/auth/infrastructure/decorators/auth.decorator';
import { CommonDoc } from 'src/core/infrastructure/decorators/documentation.decorator';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Employee } from 'src/employees/domain/employee.entity';
import { QueryBranchOfficeDto } from '../domain/dto/input/query-branch-office.dto';
import { QueryBranchSaleOrdersDto } from '../domain/dto/input/query-sale-orders.dto';
import { SaleOrdersService } from 'src/sale-orders/application/sale-orders.service';
import { QueryBranchStockDto } from '../domain/dto/input/query-stock.dto';
import { StockService } from 'src/stock/application/stock.service';
import { LoggingInterceptor } from 'src/logs/infrastructure/interceptors/log.interceptor';

@ApiTags('branch-offices')
@Controller('branch-offices')
@UseInterceptors(LoggingInterceptor)
export class BranchOfficesController {
  constructor(
    private readonly branchOfficesService: BranchOfficesService,
    private readonly ordersService: SaleOrdersService,
    private readonly stockService: StockService,
  ) {}

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

  @Post('searcher')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  @HttpCode(200)
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

  @Post(':id/sale-orders/searcher')
  @Auth('admin', 'user')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  @HttpCode(200)
  findSaleOrders(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() queryDto: QueryBranchSaleOrdersDto,
  ) {
    return this.ordersService.findAll({ ...queryDto, branchOfficeId: id });
  }

  @Post(':id/stock/searcher')
  @Auth('admin', 'user')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  @HttpCode(200)
  findStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() queryDto: QueryBranchStockDto,
  ) {
    return this.stockService.findAll({ ...queryDto, branchOfficeId: id });
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
