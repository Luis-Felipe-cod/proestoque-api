import { z } from "zod";

export const registroSchema = z.object({
  nome: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().trim().email("Formato de e-mail inválido"),
  senha: z
  .string().min(6, "A senha deve ter pelo menos 6 caracteres")
  .max(72, "A senha deve ter no máximo 72 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Formato de e-mail inválido").toLowerCase(),
  senha: z.string().min(1, "A senha é obrigatória"),
});