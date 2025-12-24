import NextAuth from "next-auth";

import { prisma } from "./prisma";
import { UserRole } from "@/generated/prisma/enums";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "database",
    maxAge: 60 * 60, //
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Force user role default saat login Google pertama kali (opsional, krn udah ada @default di prisma)
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "PATIENT" as UserRole, // Default role
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // Casting ke UserRole agar TypeScript yakin tipenya cocok
        session.user.role = user.role as UserRole;
      }
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: "__Secure-auth.session-token",

      options: {
        httpOnly: true,

        secure: true,

        sameSite: "lax",

        path: "/",
      },
    },
  },
});
