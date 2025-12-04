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


export interface PhotoInDb {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
  created_at: Date; 
  resource_type: "image" | "video" | "raw";
  type: "upload";
  version: number;
  folder: string;
  original_filename: string;
}

export interface Resourcecloudinary {
  resources : PhotoInDb | PhotoInDb[],
  next_cursor : string;
  rate_limit_allowed: number;
  rate_limit_reset_at:any;
  rate_limit_remaining : number
  
}


export interface CloudinaryResponse extends BaseReponse {
  data : Partial<Resourcecloudinary>
}

