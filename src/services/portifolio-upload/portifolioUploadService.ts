import type {
  StorageResult,
  UploadedFile,
} from "../../interfaces/portifolio-upload/@types";
import type { IStoragePortifolioRepository } from "../../interfaces/portifolio-upload/IStorageRepository";

export class PortfolioUploadService {
  constructor(private storageRepository: IStoragePortifolioRepository) {}

  async uploadImage(
    file: UploadedFile,
    category: string
  ): Promise<StorageResult> {
    const folderName = this.formatFolderName(category);
    return await this.storageRepository.upload(file, {
      folder: folderName,
    });
  }

  async uploadMultiple(
    files: UploadedFile[],
    category: string
  ): Promise<StorageResult[]> {
    const folderName = this.formatFolderName(category);

    return await this.storageRepository.uploadMultiple(files, {
      folder: folderName,
    });
  }

  async deleteImage(public_id: string): Promise<void> {
    return await this.storageRepository.delete(public_id);
  }

  private formatFolderName(category: string): string {
    return `kalita_fotografia_${category.replace(/\s+/g, "-").toLowerCase()}`;
  }
}
