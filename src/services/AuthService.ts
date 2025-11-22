import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';
import { prisma } from '../db/prisma';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  error?: string;
}

export class AuthService {
  private static getJWTSecret(): Uint8Array {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET não configurado');
    }
    return new TextEncoder().encode(secret);
  }

  static async generateToken(
    userId: string,
    email: string,
    role: string = 'user'
  ): Promise<string> {
    const secret = this.getJWTSecret();

    const token = await new SignJWT({
      email,
      role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(userId)
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    return token;
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { email, password } = credentials;

      // Buscar usuário no banco
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return {
          success: false,
          error: 'Credenciais inválidas',
        };
      }

      // Verificar senha
      const isValidPassword = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!isValidPassword) {
        return {
          success: false,
          error: 'Credenciais inválidas',
        };
      }

      // Gerar token
      const token = await this.generateToken(user.id, user.email, 'admin');

      return {
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'admin',
        },
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        error: 'Erro interno do servidor',
      };
    }
  }

  static async createAdminUser(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      // Verificar se usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return {
          success: false,
          error: 'Usuário já existe',
        };
      }

      // Hash da senha
      const saltRounds = 12;
      const password_hash = await bcrypt.hash(password, saltRounds);

      // Criar usuário
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password_hash,
        },
      });

      // Gerar token
      const token = await this.generateToken(user.id, user.email, 'admin');

      return {
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'admin',
        },
      };
    } catch (error) {
      console.error('Erro ao criar usuário admin:', error);
      return {
        success: false,
        error: 'Erro interno do servidor',
      };
    }
  }
}
