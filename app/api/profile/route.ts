import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2),
  slug: z
    .string()
    .min(3, "Slug deve ter pelo menos 3 caracteres")
    .max(32, "Slug deve ter no máximo 32 caracteres")
    .regex(
      /^[a-z0-9-]+$/,
      "Use apenas letras minúsculas, números e hífen em espaços"
    ),
  phone: z.string().optional(),
  bio: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  avatar: z.string().optional(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, phone, bio, address, website, avatar } =
      profileSchema.parse(body);

    
    const slugExists = await prisma.user.findFirst({
      where: {
        slug,
        NOT: { id: session.user.id },
      },
    });
    if (slugExists) {
      return NextResponse.json(
        { error: "Este slug já está em uso. Escolha outro." },
        { status: 409 }
      );
    }

    
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        slug,
        phone,
      },
    });

    
    await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        bio,
        address,
        website: website || null,
        avatar: avatar || null,
      },
      create: {
        userId: session.user.id,
        bio,
        address,
        website: website || null,
        avatar: avatar || null,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
