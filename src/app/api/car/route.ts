import { createCar } from "@/actions/carActions";
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

        if (!body.make || !body.model) {
            return NextResponse.json(
                { message: "make and model are required" },
                { status: 400 }
            );
        }

        try {
            const created = await createCar({
                make: body.make,
                model: body.model,
            });
            return NextResponse.json(created);
        } catch (err) {
            return NextResponse.json(
                {
                    message:
                        err instanceof Error
                            ? err.message || "Error creating car"
                            : "Unknown Error",
                },
                { status: 400 }
            );
        }
    }
);
