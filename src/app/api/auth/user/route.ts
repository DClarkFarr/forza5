import { registerUser } from "@/prisma/methods/user";
import { NextResponse } from "next/server";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/methods/session";
import { NextApiRequest, NextApiResponse } from "next";
import toJSON from "@/methods/router/toJSON";

export const POST = withIronSessionApiRoute(async (req, res) => {
    try {
        const { name, email, password } = await toJSON(req.body);

        const user = await registerUser(name, email, password);

        req.session.user = user;
        await req.session.save();

        return res.json(user);
    } catch (err) {
        if (err instanceof Error) {
            console.log("error was", err.message);
            return res.status(403).json({ message: err.message });
        } else {
            return res.status(500).json({ message: "Unknown error" });
        }
    }
}, sessionOptions);

export const GET = withIronSessionApiRoute(
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            if (!req.session.user) {
                res.status(401).json({ message: "No session" });
            }
            return res.json(req.session.user);
        } catch (err) {
            if (err instanceof Error) {
                return NextResponse.json(
                    { message: err.message },
                    { status: 402 }
                );
            } else {
                return NextResponse.json(
                    { message: "Unknown error" },
                    { status: 500 }
                );
            }
        }
    },
    sessionOptions
);
