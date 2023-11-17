"use server";

import {
    CarData,
    deleteCarById,
    findCar,
    findCarById,
    getCars,
    insertCar,
    updateCarById,
} from "@/prisma/methods/car";
import { getPaginatedCarsQuery } from "@/queries/car";

export async function getPaginatedCars({ limit = 10, page = 1 }) {
    const offset = (page - 1) * limit;

    const cars = await getCars({ limit, offset });

    return cars;
}

export async function createCar({ make, model }: CarData) {
    const makeTrimmed = make.trim();
    const modelTrimmed = model.trim();

    const existing = await findCar({ make: makeTrimmed, model: modelTrimmed });

    if (existing) {
        throw new Error("Car already exists");
    }

    return insertCar({ make: makeTrimmed, model: modelTrimmed });
}

export async function updateCar(id: number, { make, model }: CarData) {
    const makeTrimmed = make.trim();
    const modelTrimmed = model.trim();

    const found = await findCarById(id);

    if (!found) {
        throw new Error("Car not found");
    }

    const existing = await findCar(
        { make: makeTrimmed, model: modelTrimmed },
        id
    );

    if (existing) {
        throw new Error("Car already exists");
    }

    return updateCarById(id, { make: makeTrimmed, model: modelTrimmed });
}

export async function deleteCar(id: number) {
    const query = getPaginatedCarsQuery();
    const res = await deleteCarById(id);
    await query.clearAll();

    return res;
}
