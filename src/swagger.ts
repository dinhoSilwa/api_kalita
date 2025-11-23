import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Kalita Fotografia",
      version: "1.0.0",
      description: "API para gerenciamento de solicitações de serviço fotográfico e portfólio.",
      contact: {
        name: "Kalita Fotografia",
        email: "contato@kalitafotografia.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        // Schema existente do ServiceForm
        ServiceForm: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "67b61c40-9a12-4e32-a23e-8c0ab19f48f7"
            },
            full_name: {
              type: "string",
              example: "Ana Oliveira"
            },
            email: {
              type: "string",
              example: "ana.oliveira@example.com"
            },
            phone: {
              type: "string",
              example: "+55 85 99876-5432"
            },
            photo_session_type: {
              type: "string",
              example: "Ensaio de Família"
            },
            message: {
              type: "string",
              example: "Gostaria de agendar uma sessão..."
            },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
              example: "pending"
            },
            assigned_photographer: {
              type: "string",
              nullable: true,
              example: null
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-11-01T22:00:00.000Z"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-11-01T22:00:00.000Z"
            }
          }
        },
        // Novo schema para PortfolioImage
        PortfolioImage: {
          type: "object",
          properties: {
            url: {
              type: "string",
              example: "https://res.cloudinary.com/cloudname/image/upload/v1234567/kalita_fotografia_casamentos/image123.jpg"
            },
            publicId: {
              type: "string",
              example: "kalita_fotografia_casamentos/image123"
            },
            format: {
              type: "string",
              example: "jpg"
            },
            bytes: {
              type: "number",
              example: 2048576
            }
          }
        },
        // Schema para erro de validação
        ValidationError: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false
            },
            error: {
              type: "object",
              properties: {
                code: {
                  type: "number",
                  example: 422
                },
                message: {
                  type: "string",
                  example: "Campos obrigatórios inválidos"
                },
                fields: {
                  type: "object",
                  properties: {
                    full_name: {
                      type: "array",
                      items: {
                        type: "string",
                        example: "Nome completo é obrigatório"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      securitySchemes: {
        // Pode adicionar esquemas de segurança futuramente
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    tags: [
      {
        name: "Service Form",
        description: "Endpoints para gerenciamento de formulários de serviço"
      },
      {
        name: "Portfolio",
        description: "Endpoints para gerenciamento do portfólio de imagens"
      },
      {
        name: "Health",
        description: "Endpoints de verificação de saúde da API"
      }
    ]
  },
  apis: ["./src/routes/v1/**/*.ts"], // Inclui todas as rotas v1
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "API Kalita Fotografia - Documentation",
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
    },
  }));
}