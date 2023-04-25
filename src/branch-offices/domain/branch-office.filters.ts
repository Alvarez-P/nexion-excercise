import { BranchOffice } from './branch-office.entity';

export type BranchOfficeFilters = Omit<BranchOffice, 'deletedAt' | 'deletedBy'>;
