"use server";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import { FormRegisterPatient } from "@/components/forms/form-register-patient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      patientProfile: {
        select: {
          phone: true,
        },
      },
    },
  });

  if (!user) redirect("/register");

  const defaultValues = {
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.patientProfile?.phone ?? "",
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <Link href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          HealthCare
        </Link>
        <FormRegisterPatient defaultValues={defaultValues} />
      </div>
    </div>
  );
}
