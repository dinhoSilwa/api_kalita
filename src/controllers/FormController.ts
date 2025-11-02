import { Request, Response, NextFunction } from "express";
import { serviceFormSchema } from "../schemas/Form.schema";
import { createServiceForm } from "../services/FormService";
import { ZodErrors } from "../errors/customErros";
import { HttpStatusCode } from "../httpStatus/status";

export async function createServiceFormController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validation = serviceFormSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ZodErrors(validation.error);
    }

    const newForm = await createServiceForm(validation.data);

    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Formulário criado com sucesso!",
      data: newForm,
    });
  } catch (error) {
    next(error);
  }
}
