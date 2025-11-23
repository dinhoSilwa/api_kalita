import type { ServiceFormInput } from "../Form.schema";

export interface BaseReponse {
  success: boolean;
  message: string;
}

export interface ServiceInDb extends ServiceFormInput {
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceSuccessResponse extends BaseReponse {
  data: ServiceInDb;
}
