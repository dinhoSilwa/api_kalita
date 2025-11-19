# Testes - API Kalita Fotografia

## Estrutura de Testes

```
src/__tests__/
├── schemas/
│   └── Form.schema.test.ts     # Testes de validação Zod
├── services/
│   └── FormService.test.ts     # Testes do serviço de formulário
├── fixtures/
│   └── form.fixtures.ts        # Dados de teste reutilizáveis
└── integration/
    └── serviceForm.routes.test.ts  # Testes de integração (futuro)
```

## Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## Cobertura de Testes

### Form Schema (Zod)
- ✅ Validação de campos obrigatórios
- ✅ Validação de email (válidos e inválidos)
- ✅ Validação de telefone (formatos diversos)
- ✅ Valores padrão (status e assigned_photographer)

### FormService
- ✅ Criação bem-sucedida de formulário
- ✅ Limpeza de telefone (remoção de máscaras)
- ✅ Aplicação de valores padrão
- ✅ Tratamento de erros do Prisma

## Fixtures Disponíveis

- `validFormPayload` - Payload válido completo
- `missingFullName` - Payload sem nome completo
- `invalidEmail` - Payload com email inválido
- `shortPhone` - Payload com telefone muito curto
- `longPhone` - Payload com telefone muito longo
- `maskedPhone` - Payload com telefone mascarado
- `phoneTestCases` - Array de casos de teste para telefone

## Configuração

- **Timezone**: America/Sao_Paulo
- **Ambiente**: NODE_ENV=test
- **Mocks**: Prisma Client mockado
- **Timeout**: 10 segundos por teste