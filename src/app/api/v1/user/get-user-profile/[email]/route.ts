import prisma from "@/bd";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const email = (await params).email;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    const userDetails = await prisma.userProfile.findUnique({
      where: {
        userId: user?.id,
      },
    });
    return new Response(JSON.stringify(userDetails), { status: 200 });
  } catch (error) {
    throw new Error("Some thing went wrong");
  }
}
