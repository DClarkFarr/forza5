import chainMiddleware from "@/methods/router/chainMiddleware";
import { IronSessionRequest } from "@/methods/session";
import {
    hasSessionMiddleware,
    hasUserMiddleware,
} from "@/middleware/sessionMiddleware";
import { NextResponse } from "next/server";

export const POST = chainMiddleware(
    [hasSessionMiddleware, hasUserMiddleware()],
    async (req: IronSessionRequest) => {
        const body = await req.json();

        return NextResponse.json({ message: "ok" });
    }
);
