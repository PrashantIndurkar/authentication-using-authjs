"use client";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { Github, Lock } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/CardWrapper";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/login";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import Link from "next/link";

export const LoginPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // reset the fields
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-4 space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="test@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full">
              <Lock size={15} className="mr-2" /> Login
            </Button>

            <div className="flex items-center justify-center gap-x-4 w-full py-6">
              <button
                type="button"
                className="bg-white shadow-md  h-10 w-full rounded-md  text-red-400 border border-gray-100 flex items-center justify-center font-bold"
              >
                G
              </button>
              <button
                type="button"
                className="bg-white shadow-md  h-10 w-full rounded-md  text-black   border border-gray-100  flex items-center justify-center"
              >
                <Github size={20} />
              </button>
            </div>

            <Link
              href="/register"
              className="mt-2 focus:text-indigo-500 focus:outline-none text-gray-400 inline-block"
            >
              Don't have account{" "}
              <span className="text-indigo-500">register</span>
            </Link>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
