import {
  v2 as cloudinary,
  UploadApiOptions,
  type UploadApiResponse,
} from "cloudinary";
import type {
  StorageResult,
  UploadedFile,
} from "../interfaces/portifolio-upload/@types";
import type { IStoragePortifolioRepository } from "../interfaces/portifolio-upload/IStorageRepository";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryRepository implements IStoragePortifolioRepository {
  private convertDataToURI(file: UploadedFile): string {
    const base64 = file.buffer.toString("base64");
    const uri = `data:${file.mimetype};base64,${base64}`;
    return uri;
  }
  async upload(
    file: UploadedFile,
    options?: UploadApiOptions
  ): Promise<StorageResult> {
    const dataURI = this.convertDataToURI(file);
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      ...options,
    });
    return this.mapCloudinaryResult(result);
  }

  async uploadMultiple(
    files: UploadedFile[],
    options: any
  ): Promise<StorageResult[]> {
    const uploadPromisse = files.map((file) => this.upload(file, options));
    return Promise.all(uploadPromisse);
  }
  async delete(publicId: string): Promise<void> {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      throw new Error(`Erro ao deletar imagem: ${result.result}`);
    }
  }

  private mapCloudinaryResult(result: UploadApiResponse): StorageResult {
    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
    };
  }
}
