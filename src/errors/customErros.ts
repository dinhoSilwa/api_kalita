import { ZodError } from "zod";
import { HttpStatusCode } from "../httpStatus/status";

export class CustomApiError extends Error {
  public statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name; 
  }
}

export class NotFound extends CustomApiError {
  constructor(message: string = "Recurso não encontrado") {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}

export class BadRequest extends CustomApiError {
  constructor(message: string = "Requisição inválida") {
    super(message, HttpStatusCode.BAD_REQUEST); 
  }
}

export class Unauthorized extends CustomApiError {
  constructor(message: string = "Não autorizado") {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}

export class InvalidRecipient extends CustomApiError {
  constructor(message: string = "Destinatário inválido") {
    super(message, HttpStatusCode.CONFLICT); 
  }
}

export class EmailError extends CustomApiError {
  constructor(message: string = "Erro no envio de email") {
    super(message, HttpStatusCode.INTERNAL_SERVER_ERROR); 
  }
}

export class RateExpires extends CustomApiError {
  constructor(message: string = "Limite de taxa excedido") {
    super(message, HttpStatusCode.TOO_MANY_REQUESTS); 
  }
}

export class AuthError extends CustomApiError {
  constructor(message: string = "Erro de autenticação") {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}

export class TokenExpired extends CustomApiError {
  constructor(message: string = "Token expirado") {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}

export class ZodErrors extends CustomApiError {
  constructor(
    public ErrorObject: ZodError,
    message: string = "Erro de validação"
  ) {
    super(message, HttpStatusCode.UNPROCESSABLE_ENTITY); 
  }
}


export class Forbidden extends CustomApiError {
  constructor(message: string = "Acesso proibido") {
    super(message, HttpStatusCode.FORBIDDEN);
  }
}

export class Conflict extends CustomApiError {
  constructor(message: string = "Conflito de dados") {
    super(message, HttpStatusCode.CONFLICT);
  }
}

export class UploadError extends CustomApiError {
  constructor(message : string = "Falha ao Fazer Upload"){
    super(message, HttpStatusCode.UNPROCESSABLE_ENTITY)
  }
}