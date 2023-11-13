import { getCars } from "@/prisma/methods/car";

export async function getPaginatedCars({ limit = 10, page = 1 }) {
    const offset = (page - 1) * limit;

    const cars = await getCars({ limit, offset });

    return cars;
}
