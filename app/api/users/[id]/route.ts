import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
    const user = await prisma.user.findUnique({
        where: { id: params.id },
        select: { id: true, name: true, email: true, createdAt: true },
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: Params) {
    const { name } = await req.json();
    const user = await prisma.user.update({
        where: { id: params.id },
        data: { name },
    });
    return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: Params) {
    await prisma.user.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "User deleted" });
}
