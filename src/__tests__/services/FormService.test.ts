import { createServiceForm } from '../../services/FormService';

// Mock do Prisma Client
jest.mock('../../db/prisma', () => ({
  prisma: {
    serviceForm: {
      create: jest.fn(),
    },
  },
}));

import { prisma } from '../../db/prisma';
const mockCreate = prisma.serviceForm.create as jest.MockedFunction<typeof prisma.serviceForm.create>;

// Configuração do timezone para testes
process.env.TZ = 'America/Sao_Paulo';

// Fixtures para testes
const validFormPayload = {
  full_name: 'João Silva Santos',
  email: 'joao@example.com',
  phone: '(11) 91234-5678',
  photo_session_type: 'Casamento',
  message: 'Gostaria de agendar uma sessão de fotos para meu casamento.',
  assigned_photographer: null,
};

const mockCreatedForm = {
  id: '507f1f77bcf86cd799439011',
  full_name: 'João Silva Santos',
  email: 'joao@example.com',
  phone: '11912345678',
  photo_session_type: 'Casamento',
  message: 'Gostaria de agendar uma sessão de fotos para meu casamento.',
  status: 'pending',
  assigned_photographer: null,
  createdAt: new Date('2024-01-15T10:00:00.000Z'),
  updatedAt: new Date('2024-01-15T10:00:00.000Z'),
};

describe('FormService', () => {
  beforeEach(() => {
    mockCreate.mockClear();
  });

  describe('createServiceForm', () => {
    it('deve criar formulário com sucesso', async () => {
      mockCreate.mockResolvedValue(mockCreatedForm);

      const result = await createServiceForm(validFormPayload);

      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          full_name: validFormPayload.full_name,
          email: validFormPayload.email,
          phone: '11912345678', // Telefone limpo
          photo_session_type: validFormPayload.photo_session_type,
          message: validFormPayload.message,
          status: 'pending',
          assigned_photographer: null,
        },
      });

      expect(result).toEqual(mockCreatedForm);
    });

    it('deve aplicar status padrão como "pending"', async () => {
      mockCreate.mockResolvedValue(mockCreatedForm);

      await createServiceForm(validFormPayload);

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'pending',
          }),
        })
      );
    });

    it('deve aplicar assigned_photographer padrão como null', async () => {
      mockCreate.mockResolvedValue(mockCreatedForm);

      await createServiceForm(validFormPayload);

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            assigned_photographer: null,
          }),
        })
      );
    });

    it('deve propagar erros do Prisma', async () => {
      const prismaError = new Error('Database connection failed');
      mockCreate.mockRejectedValue(prismaError);

      await expect(createServiceForm(validFormPayload)).rejects.toThrow(
        'Database connection failed'
      );
    });
  });

  describe('Limpeza de telefone', () => {
    const phoneTestCases = [
      { input: '(11) 91234-5678', expected: '11912345678', description: 'parênteses e traços' },
      { input: '+55 11 91234-5678', expected: '5511912345678', description: 'código país com espaços' },
      { input: '11 9 1234 5678', expected: '11912345678', description: 'espaços múltiplos' },
      { input: '11-91234-5678', expected: '11912345678', description: 'traços' },
      { input: '11912345678', expected: '11912345678', description: 'apenas números' },
      { input: '(11)91234-5678', expected: '11912345678', description: 'parênteses sem espaço' },
    ];

    phoneTestCases.forEach(({ input, expected, description }) => {
      it(`deve limpar telefone com ${description}`, async () => {
        mockCreate.mockResolvedValue({
          ...mockCreatedForm,
          phone: expected,
        });

        await createServiceForm({ ...validFormPayload, phone: input });

        expect(mockCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              phone: expected,
            }),
          })
        );
      });
    });
  });
});