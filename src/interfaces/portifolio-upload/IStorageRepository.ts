import type { StorageResult, UploadedFile } from "./@types";

export interface IStoragePortifolioRepository {
  upload(file: UploadedFile, options: any): Promise<StorageResult>;
  uploadMultiple(files: UploadedFile[], options: any): Promise<StorageResult[]>;
  delete(publicId: string): Promise<void>;
}


