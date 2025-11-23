import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { EmailError, RateExpires, ZodErrors, type CustomApiError } from "../../errors/customErros";

export const ErrorHandlerMiddleware: ErrorRequestHandler = (
  error: Error & CustomApiError,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  console.error(error);
  const statusCode = error.statusCode || 500;
  if (error instanceof EmailError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.statusCode,
        message: error.message,
        details: process.env.NODE_ENV === "development" ? error.stack : null,
      },
    });
  }

  if (error instanceof ZodErrors) {
    return res.status(error.statusCode).json({
      errors: {
        status: error.statusCode,
        message: "Campos Obrigatórios inválidos",
        fields: error.ErrorObject,
      },
    });
  }

  if (error instanceof RateExpires) {
    return res.status(error.statusCode).json({
      errors: {
        status: error.statusCode,
        message: "Falha ao Solicitar Serviço, tente novamente mais tarde",
      },
    });
  }
  const response = {
    success: false,
    error: {
      code: statusCode,
      message: error.message || "Erro interno",
      details: process.env.NODE_ENV === "development" ? error.stack : null,
    },
  };
  return res.status(statusCode).json(response);
};