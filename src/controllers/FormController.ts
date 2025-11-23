// src/controllers/FormController.ts
import { Request, Response, NextFunction } from 'express';
import { serviceFormSchema } from '../schemas/Form.schema';
import { FormService } from '../services/service-form/FormService';
import { PrismaServiceFormRepository } from '../repositories/PrismaServiceFormRepository';
import { ZodErrors } from '../errors/customErros';
import { HttpStatusCode } from '../httpStatus/status';

const formRepository = new PrismaServiceFormRepository();
const formService = new FormService(formRepository);

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

    const newForm = await formService.createServiceForm(validation.data);

    return res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: 'Formulário criado com sucesso!',
      data: newForm,
    });
  } catch (error) {
    next(error);
  }
}

// Novos endpoints
export async function getServiceFormController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const form = await formService.getFormById(id);
    
    return res.status(HttpStatusCode.OK).json({
      success: true,
      data: form,
    });
  } catch (error) {
    next(error);
  }
}

export async function getFormsByEmailController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.params;
    const forms = await formService.getFormsByEmail(email);
    
    return res.status(HttpStatusCode.OK).json({
      success: true,
      data: forms,
    });
  } catch (error) {
    next(error);
  }
}