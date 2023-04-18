import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BranchOfficesService } from '../application/branch-offices.service';
import { CreateBranchOfficeDto } from '../dto/input/create-branch-office.dto';
import { UpdateBranchOfficeDto } from '../dto/input/update-branch-office.dto';

@Controller('branch-offices')
export class BranchOfficesController {
  constructor(private readonly branchOfficesService: BranchOfficesService) {}

  @Post()
  create(@Body() createBranchOfficeDto: CreateBranchOfficeDto) {
    return this.branchOfficesService.create(createBranchOfficeDto);
  }

  @Get()
  findAll() {
    return this.branchOfficesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchOfficesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBranchOfficeDto: UpdateBranchOfficeDto,
  ) {
    return this.branchOfficesService.update(+id, updateBranchOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchOfficesService.remove(+id);
  }
}
