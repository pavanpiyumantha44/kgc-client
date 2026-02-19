export interface ServiceDTO {
  id: string;
  name: string;
  description: string | null;
  orgId: string;
  createdAt: string;
  modifiedAt: string;
  serviceDetailsCount: number;
}
