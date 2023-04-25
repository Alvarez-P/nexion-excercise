import { BRANCH_OFFICE_REPOSITORY } from '../constants';
import { BranchOfficeModel } from '../domain/branch-office.model';

export const BranchOfficeRepository = {
  provide: BRANCH_OFFICE_REPOSITORY,
  useValue: BranchOfficeModel,
};

export type TBranchOfficeRepository = typeof BranchOfficeModel;
