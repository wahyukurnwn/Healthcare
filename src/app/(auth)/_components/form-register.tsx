"use client";

import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-number-input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerAccountAction from "../_actions/register-account";
import signInWithGoogleAction from "../_actions/sign-in-with-google";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";

// Create formSchema
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z.email(),
  phone: z.string().refine((phone) => /^(\+62|0)[1-9]\d{9,12}$/.test(phone), "Invalid phone number"),
});

// Define type
type FormValue = z.infer<typeof formSchema>;

export function FormRegister({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Setup the form
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Create fn onSubmit
  const onSubmit = async (data: FormValue) => {
    setLoading(true);

    const result = await registerAccountAction(data);
    setLoading(false);
    if (!result?.success) {
      toast.error(result?.messgae ?? "Something went wrong!!");
      return;
    }
    router.push(`/register/onboarding/patient/${result.data?.id}`);
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center text-center gap-1">
            <h1 className="text-3xl font-semibold">Hi there👋</h1>
            <p className="text-muted-foreground text-sm text-balance">Schedule your first appointment</p>
          </div>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input {...field} id="name" aria-invalid={fieldState.invalid} placeholder="Full Name" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input {...field} type="email" id="email" aria-invalid={fieldState.invalid} placeholder="me@example.com" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <div
                  className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    fieldState.invalid && "border-destructive focus-within:ring-destructive"
                  )}
                >
                  <PhoneInput
                    defaultCountry="ID"
                    placeholder="Enter phone number"
                    international
                    withCountryCallingCode
                    value={field.value}
                    onChange={(value) => field.onChange(value || "")}
                    className="flex-1 outline-none border-none bg-transparent"
                    numberInputProps={{
                      className: "flex-1 bg-transparent outline-none border-none placeholder:text-muted-foreground text-sm",
                    }}
                  />
                </div>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Field>
            <Button type="submit" disabled={loading}>
              {loading ? "Please wait..." : "Get Started"}
            </Button>
          </Field>
          <FieldSeparator>Or continue with</FieldSeparator>
        </FieldGroup>
      </form>

      <form action={signInWithGoogleAction} className="flex flex-col gap-6 mt-6">
        <FieldGroup>
          <Field>
            <Button variant="outline" type="submit" disabled={loading}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                <g fill="none" fillRule="evenodd" clipRule="evenodd">
                  <path
                    fill="#f44336"
                    d="M7.209 1.061c.725-.081 1.154-.081 1.933 0a6.57 6.57 0 0 1 3.65 1.82a100 100 0 0 0-1.986 1.93q-1.876-1.59-4.188-.734q-1.696.78-2.362 2.528a78 78 0 0 1-2.148-1.658a.26.26 0 0 0-.16-.027q1.683-3.245 5.26-3.86"
                    opacity=".987"
                  />
                  <path fill="#ffc107" d="M1.946 4.92q.085-.013.161.027a78 78 0 0 0 2.148 1.658A7.6 7.6 0 0 0 4.04 7.99q.037.678.215 1.331L2 11.116Q.527 8.038 1.946 4.92" opacity=".997" />
                  <path fill="#448aff" d="M12.685 13.29a26 26 0 0 0-2.202-1.74q1.15-.812 1.396-2.228H8.122V6.713q3.25-.027 6.497.055q.616 3.345-1.423 6.032a7 7 0 0 1-.51.49" opacity=".999" />
                  <path fill="#43a047" d="M4.255 9.322q1.23 3.057 4.51 2.854a3.94 3.94 0 0 0 1.718-.626q1.148.812 2.202 1.74a6.62 6.62 0 0 1-4.027 1.684a6.4 6.4 0 0 1-1.02 0Q3.82 14.524 2 11.116z" opacity=".993" />
                </g>
              </svg>
              {loading ? "Please wait..." : "Sign in with Google"}
            </Button>
            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link href="/log-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
