import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({
        success: false,
        error: {
          code: 401,
          message: 'Token de acesso requerido',
        },
      });
      return;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    req.user = {
      id: payload.sub as string,
      email: payload.email as string,
      role: payload.role as string,
    };

    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: {
        code: 403,
        message: 'Token inválido ou expirado',
      },
    });
  }
};

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
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

  if (req.user.role !== 'admin') {
    res.status(403).json({
      success: false,
      error: {
        code: 403,
        message: 'Acesso negado. Permissões de administrador requeridas',
      },
    });
    return;
  }

  next();
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      req.user = {
        id: payload.sub as string,
        email: payload.email as string,
        role: payload.role as string,
      };
    }

    next();
  } catch (error) {
    // Token inválido, mas continua sem autenticação
    next();
  }
};
