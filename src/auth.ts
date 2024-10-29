import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";
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
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const email = user.email as string;
          const name = user.name as string;
          const image = user.image as string;
          const findUser = await prisma.user.findFirst({
            where: {
              email: email,
            },
          });
          if (!findUser) {
            let username = name?.split(" ").join("").toLowerCase();
            username += Date.now();

            const password = username;
            const hashedPassword = await hash(password, 10);
            await prisma.user.create({
              data: {
                email: email,
                username: username,
                password: hashedPassword,
                photoURL: image,
              },
            });

            return true;
          } else {
            return true;
          }
        } catch (error) {
          throw new AuthError(error.message);
        }
      } else {
        return false;
      }
    },
  },
});