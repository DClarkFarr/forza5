import CarForm from "@/components/Car/CarForm";
import { findCarById, getCars } from "@/prisma/methods/car";

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
    const car = await findCarById(Number(params.carId));
    return (
        <div>
            <h1 className="text-lg font-bold">Edit Car</h1>
            {car && (
                <>
                    <CarForm car={car} />
                </>
            )}
            {!car && (
                <>
                    <div>You don't have a car!</div>
                </>
            )}
        </div>
    );
}
