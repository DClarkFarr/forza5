import { prisma } from "@/prisma";
import { findUserById } from "./user";
import { UserCar as PrismaUserCar } from "@prisma/client";
import { UserCar } from "@/types/User";

export async function getPaginatedUserCars(
    userId: number,
    offset = 0,
    limit = 10
) {
    const userCars = await prisma.userCar.findMany({
        where: {
            userId,
        },
        skip: offset,
        take: limit,
    });

    return userCars.map(toUserCar);
}

export async function insertUserCar(
    userId: number,
    { carId, rating }: { carId: number; rating: number }
) {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const existing = await prisma.userCar.findFirst({
        where: {
            userId,
            carId,
            rating,
        },
    });

    if (existing) {
        throw new Error("User car + rating already exists");
    }

    const userCar = await prisma.userCar.create({
        data: {
            carId,
            userId,
            rating,
        },
    });

    return toUserCar(userCar);
}

export function toUserCar(userCar: PrismaUserCar): UserCar {
    return {
        ...userCar,
        speed: parseFloat(userCar.speed.toFixed(1)),
        handling: parseFloat(userCar.handling.toFixed(1)),
        acceleration: parseFloat(userCar.acceleration.toFixed(1)),
        launch: parseFloat(userCar.launch.toFixed(1)),
        breaking: parseFloat(userCar.breaking.toFixed(1)),
        offroad: parseFloat(userCar.offroad.toFixed(1)),
    };
}
