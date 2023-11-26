import { updateCar } from "@/actions/carActions";
import chainMiddleware from "@/methods/router/chainMiddleware";
import { IronSessionRequest } from "@/methods/session";
import {
    hasSessionMiddleware,
    hasUserMiddleware,
} from "@/middleware/sessionMiddleware";
import { findCarById } from "@/prisma/methods/car";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = chainMiddleware(
    [hasSessionMiddleware, hasUserMiddleware()],
    async (req: IronSessionRequest, res: { params: { carId: string } }) => {
        const id = Number(res.params.carId);

        const car = await findCarById(id);

        if (!car) {
            return NextResponse.json(
                { message: "Car not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(car);
    }
);

export const PUT = chainMiddleware(
    [hasSessionMiddleware, hasUserMiddleware()],
    async (req: IronSessionRequest, res: { params: { carId: string } }) => {
        const body = await req.json();

        const id = Number(res.params.carId);

        if (!body.make || !body.model) {
            return NextResponse.json(
                { message: "make and model are required" },
                { status: 400 }
            );
        }

        try {
            const created = await updateCar(id, {
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
