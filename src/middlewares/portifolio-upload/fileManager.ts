import { Request , RequestHandler} from "express";
import multer from "multer";
import type { UploadedFile } from "../../interfaces/portifolio-upload/@types";

class FileManager {
  private uploader: multer.Multer;

  constructor(fileReqSize = 5 * 1024 * 1024, maxReqSize = 30) {
    this.uploader = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: fileReqSize,
        files: maxReqSize,
      },
      fileFilter: (_req: Request, file: UploadedFile, cb: any) => {
        const allowedTypes = [
          "image/png",
          "image/jpeg",
          "image/webp",
          "image/avif",
        ].includes(file.mimetype);

        if (allowedTypes) {
          cb(null, true);
        } else {
          cb(null, false);
          throw new Error("Falha ao Fazer upload, Formato de Arquivo inválido");
        }
      },
    });
  }

  single(fieldname: string = "file"): RequestHandler  {
    return this.uploader.single(fieldname);
  }
  multiple(fieldname: string = "files", maxCount: number = 30): RequestHandler  {
    return this.uploader.array(fieldname, maxCount);
  }
}

export const FilePortfolioManager = new FileManager();
