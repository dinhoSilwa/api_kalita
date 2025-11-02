import { z } from "zod";

export const serviceFormSchema = z.object({
  full_name: z.string().min(3, "Nome completo é obrigatório."),
  email: z.email({ message: "E-mail inválido." }),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .max(15, "Telefone inválido"),
  photo_session_type: z.string().min(3, "Tipo de sessão é obrigatório."),
  message: z.string().min(5, "Mensagem é obrigatória."),
});

export type ServiceFormInput = z.infer<typeof serviceFormSchema>;
