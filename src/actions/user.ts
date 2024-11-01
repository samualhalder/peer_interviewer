"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/bd";
import { UserType } from "@/types/type";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";

export const register = async (fromData: FormData) => {
  const email = fromData.get("email") as string;
  const firstName = fromData.get("firstName") as string;
  const lastName = fromData.get("lastName") as string;
  const password = fromData.get("password") as string;

  if (!email || !firstName || !lastName || !password) {
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

    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        password: hashedPassword,
        email: email,
        lastName: lastName,
        firstName: firstName,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const credentialSignIn = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
};

export const signOutFunction = async () => {
  await signOut();
};

export async function getUserData(email: string) {
  try {
    const user = (await prisma.user.findUnique({
      where: {
        email: email,
      },
    })) as UserType;
    const { password, ...rest } = user;

    return rest;
  } catch (error) {
    console.log(error);
  }
}

export async function imageUploadDB(url: string, email: string) {
  try {
    await prisma.user.update({
      where: { email: email },
      data: {
        photoURL: url,
      },
    });
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function updateUser(formData: FormData, email: string) {
  const firstName = formData.get("firstName") as string | undefined;
  const lastName = formData.get("lastName") as string | undefined;
  const password = formData.get("password") as string | undefined;
  if (!email && !firstName && !lastName && !firstName) {
    throw new Error("Atlest update one field.");
  }
  console.log(firstName, lastName, email, password);
  let hashedPassword;
  if (password) {
    hashedPassword = await hash(password, 10);
  }

  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        ...(firstName != "" && { firstName: firstName }),
        ...(lastName != "" && { lastName: lastName }),
        ...(password != "" && { password: hashedPassword }),
      },
    });
  } catch (error) {
    throw new Error("some thing went wrong");
  }
}
