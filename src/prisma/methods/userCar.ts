import { prisma } from "@/prisma";
import { findUserById } from "./user";
import { UserCar as PrismaUserCar, Car as PrismaCar } from "@prisma/client";
import { UserCar } from "@/types/User";
import { Car } from "@/types/Car";

export async function getPaginatedUserCars<C extends boolean>(
    userId: number,
    offset = 0,
    limit = 10,
    includeCar = false as C
) {
    const userCars = await prisma.userCar.findMany({
        where: {
            userId,
        },
        skip: offset,
        take: limit,
        include: {
            car: includeCar,
        },
    });

    return userCars.map(toUserCar) as (C extends true
        ? UserCar<true>
        : UserCar)[];
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

export function toCar(car: PrismaCar): Car {
    return {
        ...car,
    };
}

export function toUserCar<Input extends PrismaUserCar & { car?: PrismaCar }>(
    userCar: Input
): UserCar<true> {
    return {
        ...userCar,
        car: userCar.car ? toCar(userCar.car) : (undefined as never),
        speed: parseFloat(userCar.speed.toFixed(1)),
        handling: parseFloat(userCar.handling.toFixed(1)),
        acceleration: parseFloat(userCar.acceleration.toFixed(1)),
        launch: parseFloat(userCar.launch.toFixed(1)),
        breaking: parseFloat(userCar.breaking.toFixed(1)),
        offroad: parseFloat(userCar.offroad.toFixed(1)),
    };
}

export async function updateUserCarColumn(
    userCarId: number,
    column: keyof Omit<UserCar, "id" | "userId" | "carId">,
    value: number
) {
    return prisma.userCar.update({
        where: {
            id: userCarId,
        },
        data: {
            [column]: value,
        },
    });
}

export async function deleteUserCar(userId: number, userCarId: number) {
    return prisma.userCar.delete({
        where: {
            id: userCarId,
            userId,
        },
    });
}
