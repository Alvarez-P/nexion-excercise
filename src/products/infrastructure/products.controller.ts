import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  ParseUUIDPipe,
  Put,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from '../application/products.service';
import { CreateProductDto } from '../domain/dto/input/create-product.dto';
import { UpdateProductDto } from '../domain/dto/input/update-product.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/guards/auth.guard';
import { CommonDoc } from 'src/core/infrastructure/decorators/documentation.decorator';
import { Employee } from 'src/employees/domain/employee.entity';
import { QueryProductsDto } from '../domain/dto/input/query-products.dto';
import { LoggingInterceptor } from 'src/logs/infrastructure/interceptors/log.interceptor';

@ApiTags('products')
@Controller('products')
@UseInterceptors(LoggingInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth('admin')
  @CommonDoc()
  @ApiCreatedResponse({ description: 'Created' })
  create(
    @Body() createProductDto: CreateProductDto,
    @Request() req: { user: Employee },
  ) {
    return this.productsService.create(createProductDto, req.user.id);
  }

  @Post('searcher')
  @Auth('admin', 'user')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  @HttpCode(200)
  findAll(
    @Body() queryDto: QueryProductsDto,
    @Request() req: { user: Employee },
  ) {
    return this.productsService.findAll(queryDto, req.user.role);
  }

  @Get(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(204)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productDto: UpdateProductDto,
    @Request() req: { user: Employee },
  ) {
    return this.productsService.update(id, productDto, req.user.id);
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
    return this.productsService.remove(id, req.user.id);
  }
}
