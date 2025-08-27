import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashed = await hashPassword(password);

        const user = await prisma.user.create({
            data: { name, email, password: hashed },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET() {
    const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, createdAt: true },
    });
    return NextResponse.json(users);
}
