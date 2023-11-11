import { registerUser } from "@/prisma/methods/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();
        const user = await registerUser(name, email, password);
        return NextResponse.json(user);
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: err.message }, { status: 402 });
        } else {
            return NextResponse.json(
                { message: "Unknown error" },
                { status: 500 }
            );
        }
    }
}
