import { Request, Response, NextFunction } from 'express';
import { authenticateToken, requireAdmin } from '../../middlewares/auth';

// Mock do jose
jest.mock('jose', () => ({
  jwtVerify: jest.fn(),
}));

const mockJwtVerify = require('jose').jwtVerify;

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('authenticateToken', () => {
    it('deve falhar quando não há token', async () => {
      await authenticateToken(
        mockRequest as any,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 401,
          message: 'Token de acesso requerido',
        },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve falhar quando token é inválido', async () => {
      mockRequest.headers = {
        authorization: 'Bearer invalid-token',
      };

      mockJwtVerify.mockRejectedValue(new Error('Invalid token'));

      await authenticateToken(
        mockRequest as any,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 403,
          message: 'Token inválido ou expirado',
        },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve autenticar com token válido', async () => {
      mockRequest.headers = {
        authorization: 'Bearer valid-token',
      };

      const mockPayload = {
        sub: 'user-id',
        email: 'user@example.com',
        role: 'admin',
      };

      mockJwtVerify.mockResolvedValue({ payload: mockPayload });

      await authenticateToken(
        mockRequest as any,
        mockResponse as Response,
        mockNext
      );

      expect((mockRequest as any).user).toEqual({
        id: 'user-id',
        email: 'user@example.com',
        role: 'admin',
      });
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe('requireAdmin', () => {
    it('deve falhar quando usuário não está autenticado', () => {
      requireAdmin(mockRequest as any, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 401,
          message: 'Usuário não autenticado',
        },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve falhar quando usuário não é admin', () => {
      (mockRequest as any).user = {
        id: 'user-id',
        email: 'user@example.com',
        role: 'user',
      };

      requireAdmin(mockRequest as any, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 403,
          message: 'Acesso negado. Permissões de administrador requeridas',
        },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('deve permitir acesso para admin', () => {
      (mockRequest as any).user = {
        id: 'admin-id',
        email: 'admin@example.com',
        role: 'admin',
      };

      requireAdmin(mockRequest as any, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });
});
