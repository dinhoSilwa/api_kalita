import { Request, Response, NextFunction } from "express";
import { container } from "../../containers";
import { PortfolioUploadService } from "../../services/portifolio-upload/portifolioUploadService";
import { UploadError } from "../../errors/customErros";
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
  const { category } = req.body;
  const file = req.files as unknown as UploadedFile;
  
  try {
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

export async function uploadMultipleImageController(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const files = req.files as unknown as UploadedFile[];
  const { category } = req.body;

  try {
       if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw new UploadError("Nenhum arquivo enviado");
    }

    if (!req.body?.category) {
      throw new UploadError("Categoria não enviada");
    }
    const result = await service.uploadMultiple(files, category);
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Imagens adcionadas ao Portifolio",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body) {
    throw new UploadError("Falha ao deletar imagem");
  }

  const { public_id } = req.body;

  try {
    await service.deleteImage(public_id);
    res.status(HttpStatusCode.ACCEPTED).json({
      success: true,
      message: "Falha ao Deletar a Imagem",
      data: null,
    });
  } catch (error) {
    next(error);
  }
}
