"use server";

import * as z from "zod";
import { prisma } from "@/lib/prisma";

// Create formSchema
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z.email(),
  phone: z.string().refine((phone) => /^(\+62|0)[1-9]\d{9,12}$/.test(phone), "Invalid phone number"),
});

export default async function registerAccountAction(data: z.infer<typeof formSchema>) {
  try {
    const parsed = formSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        messgae: "Invalid form Data",
      };
    }

    const { name, email, phone } = parsed.data;

    // check email already registered?
    let registeredUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (registeredUser) {
      return {
        success: false,
        message: "Email already registered",
      };
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        patientProfile: {
          create: {
            phone,
          },
        },
      },
    });

    console.log(newUser);

    return {
      success: true,
      data: newUser,
    };
  } catch (error: any) {
    console.log(error?.message);
  }
}
