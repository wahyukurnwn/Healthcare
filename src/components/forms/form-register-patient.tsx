"use client";

import * as z from "zod";
import { doctors } from "@/data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CustomFormField } from "./custom-form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Create formSchema
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
              {/* Personal Information */}
              <Field>
                <h2 className="text-left text-xl font-semibold">Personal Information</h2>
              </Field>

              <CustomFormField name="name" control={form.control} label="Full Name" type="text" placeholder="Full Name" />

              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomFormField name="email" control={form.control} label="Email" type="email" placeholder="me@example.com" />
                  <CustomFormField name="phone" control={form.control} label="Phone Number" type="phone" placeholder="Enter phone number" />
                </Field>
              </Field>

              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomFormField name="dateOfBirth" control={form.control} label="Date of birth" type="date" />

                  {/* not completed */}
                  <CustomFormField name="gender" control={form.control} label="Gender" type="radio" />
                </Field>
              </Field>

              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomFormField name="address" control={form.control} label="Address" type="text" placeholder="ex: Jalan Karapitan No.9, Bandung, Indonesia" />

                  <CustomFormField name="occupation" control={form.control} label="Occupation" type="text" placeholder="ex: Software Engineer" />
                </Field>
              </Field>

              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomFormField name="emergencyNumber" control={form.control} label="Emergency Contact Name" type="text" placeholder="Guardian's Name" />
                  <CustomFormField name="emergencyPhone" control={form.control} label="Emergency Phone Number" type="text" placeholder="Guardian's Phone Number" />
                </Field>
              </Field>

              {/* Medical Information */}
              <Field>
                <h2 className="text-left text-xl font-semibold">Medical Information</h2>
              </Field>

              {/* not completed */}
              <CustomFormField name="primaryCarePhysician" control={form.control} label="Primary care physician" type="select" placeholder="Select a doctor" />

              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomFormField name="insuranceProvider" control={form.control} label="Insurance Provider" type="text" placeholder="ex: BPJS Kesehatan" />
                  <CustomFormField name="insurancePolicyNumber" control={form.control} label="Insurance Policy Number" type="text" placeholder="ex: ABC123456789" />
                </Field>
              </Field>

              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomFormField name="allergies" control={form.control} label="Allergies (if any)" type="textarea" placeholder="ex: Peanuts, Penicillin, Pollen" />
                  <CustomFormField name="currentMedication" control={form.control} label="Current Medication" type="textarea" placeholder="ex: Ibuprofen 200mg, Levathyraxine 50mcg" />
                </Field>
              </Field>

              <Field>
                <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomFormField name="familyMedicalHistory" control={form.control} label="Family medical history (if relevant)" type="textarea" placeholder="ex: Mother had breast cancer" />
                  <CustomFormField name="pastMedicalHistory" control={form.control} label="Past Medical History" type="textarea" placeholder="ex: Asthma diagnosis in childhood" />
                </Field>
              </Field>

              {/* Identification and Verification */}
              <Field>
                <h2 className="text-left text-xl font-semibold">Identification and Verification</h2>
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
