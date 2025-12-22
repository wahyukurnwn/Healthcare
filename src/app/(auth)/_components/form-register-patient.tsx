"use client";

import * as z from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { doctors } from "@/data";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email"),
  phone: z.string().refine((phone) => /^(\+62|0)[1-9]\d{9,12}$/.test(phone), "Invalid phone number"),

  dateOfBirth: z.date(),

  gender: z.enum(["MALE", "FEMALE"]),
  address: z.string().min(2, "Address must be at least 2 characters"),
  occupation: z.string().min(2),

  emergencyName: z.string().min(3),
  emergencyPhone: z.string().refine((phone) => /^(\+62|0)[1-9]\d{9,12}$/.test(phone), "Invalid phone number"),
});

// defined Type formValue
type FormValue = z.infer<typeof formSchema>;

type FormRegiterPatientProps = {
  defaultValues: {
    name: string;
    email: string;
    phone: string;
  };
};

export function FormRegisterPatient({ defaultValues, className, ...props }: FormRegiterPatientProps & React.ComponentProps<"div">) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // set up form
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues.name,
      email: defaultValues.email,
      phone: defaultValues.phone,
      gender: "MALE",
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">Welcome👋</CardTitle>
          <CardDescription className="text-muted-foreground text-sm text-balance">Let us know more about yourself</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <h2 className="text-left text-xl font-semibold">Personal Information</h2>
              </Field>
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

              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                        <Input {...field} id="phone" aria-invalid={fieldState.invalid} placeholder="Phone number" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </Field>
              </Field>

              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Controller
                    name="dateOfBirth"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="dateOfBirth">Date of Birth</FieldLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-between">
                              {field.value ? field.value.toLocaleDateString() : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent className="p-0">
                            <Calendar mode="single" selected={field.value} onSelect={(date) => field.onChange(date)} />
                          </PopoverContent>
                        </Popover>

                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <Controller
                    name="gender"
                    control={form.control}
                    render={({ field }) => (
                      <div>
                        <FieldLabel htmlFor="gender">Gender</FieldLabel>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap justify-items-end-safe items-center gap-4 my-3">
                          <div className="flex items-center gap-2 px-3 py-1 border-2 border-dotted">
                            <RadioGroupItem value="MALE" /> Male
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 border-2 border-dotted">
                            <RadioGroupItem value="FEMALE" /> Female
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  />
                </Field>
              </Field>

              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Controller
                    name="address"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <Input {...field} id="address" aria-invalid={fieldState.invalid} placeholder="ex: Jalan Karapitan, Bandung, Indonesia" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <Controller
                    name="occupation"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="occupation">Occupation</FieldLabel>
                        <Input {...field} id="occupation" aria-invalid={fieldState.invalid} placeholder="Software Engineer" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </Field>
              </Field>
              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="EmergencyName">Emergency contact name</FieldLabel>
                    <Input id="EmergencyName" placeholder="Guardian's name" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="EmergencyPhoneNumber">Emergency phone number</FieldLabel>
                    <Input id="EmergencyPhoneNumber" placeholder="Phone Number" />
                  </Field>
                </Field>
              </Field>

              {/* LANJUTKAN KODE UNTUK DI COLUMN FIED DI BAWAH INI */}
              <Field>
                <h2 className="text-left text-xl font-semibold">Medical Information</h2>
              </Field>

              {/* Submit button */}
              <Field>
                <Button type="submit">Submit and Continue</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
