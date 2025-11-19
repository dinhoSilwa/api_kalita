import { serviceFormSchema } from '../../schemas/Form.schema';

// Configuração do timezone para testes
process.env.TZ = 'America/Sao_Paulo';

// Fixtures para testes
const validFormPayload = {
  full_name: 'João Silva Santos',
  email: 'joao@example.com',
  phone: '(11) 91234-5678',
  photo_session_type: 'Casamento',
  message: 'Gostaria de agendar uma sessão de fotos para meu casamento.',
};

const missingFullName = {
  email: 'joao@example.com',
  phone: '(11) 91234-5678',
  photo_session_type: 'Casamento',
  message: 'Mensagem de teste',
};

const invalidEmail = {
  ...validFormPayload,
  email: 'invalid@',
};

const shortPhone = {
  ...validFormPayload,
  phone: '1234',
};

const longPhone = {
  ...validFormPayload,
  phone: '123456789012345678',
};

const maskedPhone = {
  ...validFormPayload,
  phone: '+55 11 91234-5678',
};

describe('Form Schema Validation', () => {
  describe('Campos obrigatórios', () => {
    it('deve falhar quando full_name está ausente', () => {
      const result = serviceFormSchema.safeParse(missingFullName);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((err: any) => 
          err.path.includes('full_name')
        )).toBe(true);
      }
    });

    it('deve falhar quando email está ausente', () => {
      const { email, ...payload } = validFormPayload;
      const result = serviceFormSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((err: any) => err.path.includes('email'))).toBe(true);
      }
    });

    it('deve falhar quando phone está ausente', () => {
      const { phone, ...payload } = validFormPayload;
      const result = serviceFormSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((err: any) => err.path.includes('phone'))).toBe(true);
      }
    });

    it('deve falhar quando photo_session_type está ausente', () => {
      const { photo_session_type, ...payload } = validFormPayload;
      const result = serviceFormSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((err: any) => 
          err.path.includes('photo_session_type')
        )).toBe(true);
      }
    });

    it('deve falhar quando message está ausente', () => {
      const { message, ...payload } = validFormPayload;
      const result = serviceFormSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((err: any) => 
          err.path.includes('message')
        )).toBe(true);
      }
    });
  });

  describe('Validação de email', () => {
    it('deve aceitar emails válidos', () => {
      const validEmails = [
        'user@example.com',
        'user.name+tag@domain.co.br',
        'test.email@subdomain.domain.com',
      ];

      validEmails.forEach(email => {
        const result = serviceFormSchema.safeParse({ ...validFormPayload, email });
        expect(result.success).toBe(true);
      });
    });

    it('deve rejeitar emails inválidos', () => {
      const invalidEmails = ['user@', 'user@@domain', 'user@domain', ''];

      invalidEmails.forEach(email => {
        const result = serviceFormSchema.safeParse({ ...validFormPayload, email });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.some((err: any) => 
            err.path.includes('email') && err.message.includes('inválido')
          )).toBe(true);
        }
      });
    });
  });

  describe('Validação de phone', () => {
    it('deve aceitar telefones com máscara', () => {
      const validPhones = [
        '(11) 91234-5678',
        '11 91234-5678',
      ];

      validPhones.forEach(phone => {
        const result = serviceFormSchema.safeParse({ ...validFormPayload, phone });
        expect(result.success).toBe(true);
      });
    });

    it('deve aceitar telefone com código do país', () => {
      const result = serviceFormSchema.safeParse({ ...validFormPayload, phone: '5511912345678' });
      expect(result.success).toBe(true);
    });

    it('deve aceitar telefones sem máscara', () => {
      const result = serviceFormSchema.safeParse({ ...validFormPayload, phone: '11912345678' });
      expect(result.success).toBe(true);
    });

    it('deve rejeitar números muito curtos', () => {
      const result = serviceFormSchema.safeParse(shortPhone);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((err: any) => 
          err.path.includes('phone') && err.message.includes('inválido')
        )).toBe(true);
      }
    });

    it('deve rejeitar números muito longos', () => {
      const result = serviceFormSchema.safeParse(longPhone);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((err: any) => 
          err.path.includes('phone') && err.message.includes('inválido')
        )).toBe(true);
      }
    });
  });

  describe('Valores padrão', () => {
    it('deve aceitar quando status não é informado', () => {
      const result = serviceFormSchema.safeParse(validFormPayload);
      expect(result.success).toBe(true);
    });

    it('deve definir assigned_photographer como null quando não informado', () => {
      const result = serviceFormSchema.safeParse(validFormPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.assigned_photographer).toBe(null);
      }
    });

    it('deve aceitar assigned_photographer como null explicitamente', () => {
      const payload = { ...validFormPayload, assigned_photographer: null };
      const result = serviceFormSchema.safeParse(payload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.assigned_photographer).toBe(null);
      }
    });
  });

  describe('Validação completa', () => {
    it('deve validar payload completo e válido', () => {
      const result = serviceFormSchema.safeParse(validFormPayload);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.full_name).toBe(validFormPayload.full_name);
        expect(result.data.email).toBe(validFormPayload.email);
        expect(result.data.phone).toBe(validFormPayload.phone);
        expect(result.data.photo_session_type).toBe(validFormPayload.photo_session_type);
        expect(result.data.message).toBe(validFormPayload.message);
        expect(result.data.assigned_photographer).toBe(null);
      }
    });
  });
});