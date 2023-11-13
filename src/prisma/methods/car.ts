import { prisma } from "@/prisma";

export async function getCars({ limit = 10, offset = 0 }) {
    return prisma.car.findMany({
        take: limit,
        skip: offset,
    });
}
