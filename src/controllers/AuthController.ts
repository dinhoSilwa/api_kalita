import { Request, Response } from 'express';
import { AuthService, LoginCredentials } from '../services/AuthService';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

const createAdminSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = loginSchema.parse(req.body);

      const result = await AuthService.login(validatedData as LoginCredentials);

      if (result.success) {
        res.status(200).json({
          success: true,
          data: {
            token: result.token,
            user: result.user,
          },
        });
      } else {
        res.status(401).json({
          success: false,
          error: {
            code: 401,
            message: result.error,
          },
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: {
            code: 400,
            message: 'Dados inválidos',
            details: error.errors,
          },
        });
        return;
      }

      console.error('Erro no login:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          message: 'Erro interno do servidor',
        },
      });
    }
  }

  static async createAdmin(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = createAdminSchema.parse(req.body);

      const result = await AuthService.createAdminUser(
        validatedData.name,
        validatedData.email,
        validatedData.password
      );

      if (result.success) {
        res.status(201).json({
          success: true,
          data: {
            token: result.token,
            user: result.user,
          },
        });
      } else {
        res.status(400).json({
          success: false,
          error: {
            code: 400,
            message: result.error,
          },
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: {
            code: 400,
            message: 'Dados inválidos',
            details: error.errors,
          },
        });
        return;
      }

      console.error('Erro ao criar admin:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          message: 'Erro interno do servidor',
        },
      });
    }
  }

  static async me(req: Request & { user?: any }, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: {
            code: 401,
            message: 'Usuário não autenticado',
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          user: req.user,
        },
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          message: 'Erro interno do servidor',
        },
      });
    }
  }
}
