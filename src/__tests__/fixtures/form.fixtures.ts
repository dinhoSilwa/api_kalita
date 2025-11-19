// Fixtures para testes de formulário

export const validFormPayload = {
  full_name: 'João Silva Santos',
  email: 'joao@example.com',
  phone: '(11) 91234-5678',
  photo_session_type: 'Casamento',
  message: 'Gostaria de agendar uma sessão de fotos para meu casamento.',
};

export const missingFullName = {
  email: 'joao@example.com',
  phone: '(11) 91234-5678',
  photo_session_type: 'Casamento',
  message: 'Mensagem de teste',
};

export const invalidEmail = {
  ...validFormPayload,
  email: 'invalid@',
};

export const shortPhone = {
  ...validFormPayload,
  phone: '1234',
};

export const longPhone = {
  ...validFormPayload,
  phone: '123456789012345678',
};

export const maskedPhone = {
  ...validFormPayload,
  phone: '+55 11 91234-5678',
};

export const phoneWithSpaces = {
  ...validFormPayload,
  phone: '11 9 1234 5678',
};

export const phoneWithDashes = {
  ...validFormPayload,
  phone: '11-91234-5678',
};

export const mockCreatedForm = {
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

export const phoneTestCases = [
  { input: '(11) 91234-5678', expected: '11912345678', description: 'parênteses e traços' },
  { input: '+55 11 91234-5678', expected: '5511912345678', description: 'código país com espaços' },
  { input: '11 9 1234 5678', expected: '11912345678', description: 'espaços múltiplos' },
  { input: '11-91234-5678', expected: '11912345678', description: 'traços' },
  { input: '11912345678', expected: '11912345678', description: 'apenas números' },
  { input: '(11)91234-5678', expected: '11912345678', description: 'parênteses sem espaço' },
];

export const validEmails = [
  'user@example.com',
  'user.name+tag@domain.co.br',
  'test.email@subdomain.domain.com',
];

export const invalidEmails = [
  'user@',
  'user@@domain',
  'user@domain',
  '',
];