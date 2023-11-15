import { CarData, findCar, getCars, insertCar } from "@/prisma/methods/car";

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
