const statusCodes = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  
  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409, 
  UNPROCESSABLE_ENTITY: 422, 
  TOO_MANY_REQUESTS: 429, 
  PAYLOAD_TOO_LARGE: 413,    
  
  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,          
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  INSUFFICIENT_STORAGE: 507, 
} as const;

export const HttpStatusCode = {
  ...statusCodes,
  isSuccess: (status: number): boolean => status >= 200 && status < 300,
  isClientError: (status: number): boolean => status >= 400 && status < 500,
  isServerError: (status: number): boolean => status >= 500 && status < 600,
} as const;

export type HttpStatusCodeType = typeof HttpStatusCode[keyof typeof statusCodes];