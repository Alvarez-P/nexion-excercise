export class BaseProductCategoryDto {
  id: string;
  name: string;
  description: string | null;
  updatedAt: string;
  createdAt: string;
  updatedBy: string;
  createdBy: string;
  deletedAt: string | null;
  deletedBy: string | null;
}
