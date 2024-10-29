"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/bd";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";

export const register = async (fromData: FormData) => {
  const email = fromData.get("email") as string;
  const username = fromData.get("username") as string;
  const password = fromData.get("password") as string;
  console.log(email, password, username);
  if (!email || !username || !password) {
    throw new Error("fill all the fields");
  }

  try {
    const userEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userEmail) {
      throw new Error("User already exists.");
    }
    const usernameUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (usernameUser) {
      throw new Error("username already exists,try different username.");
    }
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const credentialSignIn = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};

export const signOutFunction = async () => {
  await signOut();
};
