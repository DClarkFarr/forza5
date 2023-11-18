import chainMiddleware from "@/methods/router/chainMiddleware";
import { IronSessionRequest } from "@/methods/session";
import {
    hasSessionMiddleware,
    hasUserMiddleware,
} from "@/middleware/sessionMiddleware";
import { getPaginatedUserCars } from "@/prisma/methods/userCar";
import { NextRequest, NextResponse } from "next/server";

export const GET = chainMiddleware(
    [hasSessionMiddleware, hasUserMiddleware()],
    async (req: IronSessionRequest) => {
        const searchParams = req.nextUrl.searchParams;

        const limit = Number(searchParams.get("limit") || 10);
        const page = Number(searchParams.get("page") || 1);

        try {
            const userCars = await getPaginatedUserCars(
                req.session.user!.id,
                (page - 1) * limit,
                limit
            );

            return NextResponse.json(userCars);
        } catch (err) {
            return NextResponse.json(
                {
                    message:
                        err instanceof Error
                            ? err.message || "Error creating car stat"
                            : "Unknown Error",
                },
                { status: 400 }
            );
        }
    }
);
