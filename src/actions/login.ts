"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";

// validate the action using zod schema
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }

  return { success: "Email send!" };
};
