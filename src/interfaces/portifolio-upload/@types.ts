export interface StorageResult {
  url : string;
  publicId? : string;
  format ?: string;
  bytes : number
}



export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
