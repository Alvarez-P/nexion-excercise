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
import { ProductCategoriesService } from '../application/product-categories.service';
import { CreateProductCategoryDto } from '../domain/dto/input/create-product-category.dto';
import { UpdateProductCategoryDto } from '../domain/dto/input/update-product-category.dto';
import { Auth } from 'src/auth/infrastructure/decorators/auth.decorator';
import { CommonDoc } from 'src/core/infrastructure/decorators/documentation.decorator';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Employee } from 'src/employees/domain/employee.entity';
import { QueryProductCategoriesDto } from '../domain/dto/input/query-product-category.dto';
import { LoggingInterceptor } from 'src/logs/infrastructure/interceptors/log.interceptor';

@ApiTags('product-categories')
@Controller('product-categories')
@UseInterceptors(LoggingInterceptor)
export class ProductCategoriesController {
  constructor(private readonly pCategoriesService: ProductCategoriesService) {}

  @Post()
  @Auth('admin')
  @CommonDoc()
  @ApiCreatedResponse({ description: 'Created' })
  create(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
    @Request() req: { user: Employee },
  ) {
    return this.pCategoriesService.create(
      createProductCategoryDto,
      req.user.id,
    );
  }

  @Post('searcher')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  @HttpCode(200)
  findAll(@Body() queryDto: QueryProductCategoriesDto) {
    return this.pCategoriesService.findAll(queryDto);
  }

  @Get(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiOkResponse({ description: 'Success' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pCategoriesService.findOne(id);
  }

  @Put(':id')
  @Auth('admin')
  @CommonDoc()
  @ApiNoContentResponse({ description: 'No Content' })
  @HttpCode(204)
  update(
    @Param('id') id: string,
    @Body() productCategoryDto: UpdateProductCategoryDto,
    @Request() req: { user: Employee },
  ) {
    return this.pCategoriesService.update(id, productCategoryDto, req.user.id);
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
    return this.pCategoriesService.remove(id, req.user.id);
  }
}
