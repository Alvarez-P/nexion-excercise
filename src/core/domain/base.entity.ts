export interface IBaseEntity {
  id: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
  updatedBy: string;
  createdBy: string;
  deletedBy: string | null;
}
