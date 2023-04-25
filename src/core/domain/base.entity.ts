export interface IBaseEntity {
  id: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
}
