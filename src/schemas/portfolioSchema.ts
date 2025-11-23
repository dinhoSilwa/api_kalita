import { z } from "zod";

const MAX = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpg", "image/png", "image/webp", "image/jpeg"];

export const PortfolioSchema = z.object({
  data: z.array(
    z.object({
      category: z.string()
    })
  ),
  files: z
    .array(
      z.object({
        mimetype: z.string(),
        size: z.number(),
      })
    )
    .min(1, "Selecione pelo menos 01 arquivo"),
});
