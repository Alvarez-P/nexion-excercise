import { Injectable } from '@nestjs/common';
import { CreateBranchOfficeDto } from '../domain/dto/input/create-branch-office.dto';
import { UpdateBranchOfficeDto } from '../domain/dto/input/update-branch-office.dto';

@Injectable()
export class BranchOfficesService {
  create(createBranchOfficeDto: CreateBranchOfficeDto) {
    return 'This action adds a new branchOffice';
  }

  findAll() {
    return `This action returns all branchOffices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branchOffice`;
  }

  update(id: number, updateBranchOfficeDto: UpdateBranchOfficeDto) {
    return `This action updates a #${id} branchOffice`;
  }

  remove(id: number) {
    return `This action removes a #${id} branchOffice`;
  }
}
