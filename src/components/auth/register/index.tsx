"use client";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

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
import { Github, LogIn } from "lucide-react";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";
import Link from "next/link";

export const RegisterPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
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
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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
                    <Input {...field} placeholder="*******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button className="w-full">
              Create an account <LogIn className="ml-2" size={15} />
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
              href="/login"
              className="mt-2 focus:text-indigo-500 focus:outline-none text-gray-400 inline-block"
            >
              Already have an account{" "}
              <span className="text-indigo-500">login</span>
            </Link>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
