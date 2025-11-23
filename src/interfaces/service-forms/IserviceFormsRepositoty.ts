import type { ServiceFormInput } from "../../schemas/Form.schema";
import type { ServiceSuccessResponse } from "../../schemas/response/ResponseBase";

export interface IServiceFormRepository {
  create(data: ServiceFormInput): Promise<ServiceSuccessResponse>;
  findById(id: string): Promise<ServiceSuccessResponse | null>;
  findByEmail(email: string): Promise<ServiceSuccessResponse[]>;
  update(
    id: string,
    data: Partial<ServiceSuccessResponse>
  ): Promise<ServiceSuccessResponse>;
  delete(id: string): Promise<void>;
  findAll(params?: PaginationParams): Promise<ServiceSuccessResponse[]>;
}
export interface PaginationParams {
  page?: number;
  limit?: number;
}
