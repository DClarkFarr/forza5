import CarForm from "@/components/Car/CarForm";
import { findCarById, getCars } from "@/prisma/methods/car";
import { useCarQuery } from "@/queries/car";
import { Car } from "@/types/Car";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { cache } from "react";

export async function generateStaticParams() {
    const cars = await getCars({ limit: 1000 });

    return cars.map((car) => ({
        carId: String(car.id),
    }));
}

export default async function EditCarPage({
    params,
}: {
    params: { carId: string };
}) {
    const carQuery = useCarQuery(params.carId);

    const car = await carQuery.query();

    const onUpdate = async () => {
        "use server";
        carQuery.clear();
    };
    return (
        <div>
            <h1 className="text-lg font-bold">Edit Car</h1>
            {car && (
                <>
                    <CarForm car={car} onSuccess={onUpdate} />
                </>
            )}
            {!car && (
                <>
                    <div>You dont have a car!</div>
                </>
            )}
        </div>
    );
}
