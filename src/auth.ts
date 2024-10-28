import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "./bd";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "text",
          label: "password",
        },
      },
      authorize: async (credentials) => {
        const password = credentials.password as string;
        const email = credentials.email as string;
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });
        if (!user) {
          throw new CredentialsSignin({ cause: "Wrong Credentials." });
        }
        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
          throw new CredentialsSignin({ cause: "Wrong Credentials" });
        }
        const { password: userPassword, ...rest } = user;
        return rest;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});
