import { createCar, getPaginatedCars } from "@/actions/carActions";
import chainMiddleware from "@/methods/router/chainMiddleware";
import { IronSessionRequest } from "@/methods/session";
import {
    hasSessionMiddleware,
    hasUserMiddleware,
} from "@/middleware/sessionMiddleware";
import { NextResponse } from "next/server";

export const GET = chainMiddleware(
    [hasSessionMiddleware, hasUserMiddleware()],
    async (req: IronSessionRequest) => {
        const searchParams = req.nextUrl.searchParams;
        const cars = await getPaginatedCars({
            limit: Number(searchParams.get("limit")) || 10,
            page: Number(searchParams.get("page")) || 1,
        });

        return NextResponse.json(cars);
    }
);

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
