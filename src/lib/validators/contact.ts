import { z } from "zod";

// Zod validation schema matching the database schema and validation constraints
export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." })
    .max(1000, { message: "Message cannot exceed 1000 characters." }),
  source: z.enum(["WHATSAPP", "TELEGRAM", "FORM"], {
    message: "Source must be one of: WHATSAPP, TELEGRAM, FORM.",
  }),
});

// Infer the TypeScript type from the Zod validator schema
export type ContactFormInput = z.infer<typeof ContactFormSchema>;
