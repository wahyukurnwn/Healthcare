import { DefaultSession } from "next-auth";
// Pastikan nama import ini sesuai dengan nama ENUM di schema.prisma Anda
// Di prompt sebelumnya Anda menggunakan 'enum UserRole', jadi import-nya harus UserRole.
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole; // Gunakan tipe Enum dari Prisma
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

// INI BAGIAN PENTING YANG KURANG:
// Kita harus memberitahu adapter bahwa data dari database juga punya 'role'
declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: UserRole;
  }
}
