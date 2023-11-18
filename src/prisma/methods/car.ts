import { prisma } from "@/prisma";
import { Car } from "@/types/Car";
import { UserCar } from "@/types/User";
import { toUserCar } from "./userCar";

export async function getCars({ limit = 10, offset = 0 }) {
    return prisma.car.findMany({
        take: limit,
        skip: offset,
    });
}

export type CarData = Omit<Car, "id">;

export async function insertCar({ make, model }: CarData): Promise<Car> {
    return prisma.car.create({
        data: {
            make,
            model,
        },
    });
}

export async function findCar(
    { make, model }: CarData,
    edcludeId?: number
): Promise<Car | null> {
    return prisma.car.findFirst({
        where: {
            make,
            model,
            NOT: {
                id: edcludeId,
            },
        },
    });
}

export async function findCarById(id: number): Promise<Car | null> {
    return prisma.car.findUnique({
        where: {
            id,
        },
    });
}

export async function updateCarById(id: number, data: CarData): Promise<Car> {
    return prisma.car.update({
        where: {
            id,
        },
        data,
    });
}

export async function getUserCarsByCarId(carId: number) {
    const results = await prisma.userCar.findMany({
        where: {
            carId,
        },
    });

    return results.map(toUserCar);
}

export async function deleteCarById(id: number): Promise<Car> {
    const userCars = await getUserCarsByCarId(id);
    if (userCars.length) {
        throw new Error(`Car is in use in ${userCars.length} places`);
    }

    return prisma.car.delete({
        where: {
            id,
        },
    });
}
