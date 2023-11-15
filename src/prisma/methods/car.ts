import { prisma } from "@/prisma";
import { Car } from "@/types/Car";

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

export async function findCar({ make, model }: CarData): Promise<Car | null> {
    return prisma.car.findFirst({
        where: {
            make,
            model,
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
