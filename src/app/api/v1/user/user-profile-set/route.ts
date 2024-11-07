import { auth } from "@/auth";
import prisma from "@/bd";
import { UserType } from "@/types/type";

export async function POST(req: Request) {
  const userSession = await auth();
  if (!userSession) {
    return new Response("unauthorized", { status: 401 });
  }
  try {
    const body = await req.json();
    console.log(body);

    const user = (await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })) as UserType;
    const userProfile = await prisma.userProfile.findFirst({
      where: {
        userId: user?.id,
      },
    });

    if (userProfile) {
      await prisma.userProfile.update({
        where: {
          userId: user?.id,
        },
        data: {
          about: body.about ?? undefined,
          techStack: body.techStack ?? undefined,
          organization: body.organization ?? undefined,
          linkedin: body.linkedin ?? undefined,
          portfolio: body.portfolio ?? undefined,
          experience: Number(body.experience) ?? undefined,
          resumeLink: body.resume ?? undefined,
        },
      });
      return new Response("profile updated successfully", { status: 200 });
    } else {
      await prisma.userProfile.create({
        data: {
          userId: user.id,
          about: body.about ?? undefined,
          techStack: body.techStack ?? undefined,
          organization: body.organization ?? undefined,
          linkedin: body.linkedin ?? undefined,
          portfolio: body.portfolio ?? undefined,
          experience: Number(body.experience) ?? undefined,
          resumeLink: body.resume ?? undefined,
        },
      });
      return new Response("profile saved successfully", { status: 200 });
    }
  } catch (error) {
    console.log(error);

    throw new Error("something went wrong");
  }
}
