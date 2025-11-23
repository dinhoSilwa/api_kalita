import { Request, Response, NextFunction } from "express";
import { container } from "../../containers";
import { PortfolioUploadService } from "../../services/portifolio-upload/portifolioUploadService";
import {  UploadError } from "../../errors/customErros";
import type { UploadedFile } from "../../interfaces/portifolio-upload/@types";
import { HttpStatusCode } from "../../httpStatus/status";

const service = container.resolve<PortfolioUploadService>(
  "PortfolioUploadService"
);

export async function uploadSingleImageController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body || !req.file) {
    throw new UploadError("Falha ao criar upload");
  }
  try {
    const { category } = req.body;
    const file = req.files as unknown as UploadedFile;

    const result = await service.uploadImage(file, category);

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Imagem Adcionada ao Portifolio",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
