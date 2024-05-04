"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";

// validate the action using zod schema
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }

  return { success: "Email send!" };
};
