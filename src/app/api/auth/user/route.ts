import { registerUser } from "@/prisma/methods/user";
import { NextResponse } from "next/server";
import { ironSessionMiddleware } from "@/methods/session";

export const POST = ironSessionMiddleware(async (req, res) => {
    try {
        const { name, email, password } = await req.json();

        const user = await registerUser(name, email, password);

        req.session.user = user;
        await req.session.save();

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
});

export const GET = ironSessionMiddleware(async (req, res) => {
    try {
        if (!req.session.user) {
            return NextResponse.json(
                { message: "No session" },
                { status: 401 }
            );
        }
        return NextResponse.json(req.session.user);
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
});
