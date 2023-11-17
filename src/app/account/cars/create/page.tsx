import CarForm from "@/components/Car/CarForm";
import { usePaginatedCarsQuery } from "@/queries/car";
import { Car } from "@/types/Car";
import { redirect } from "next/navigation";

export default async function CreateCarPage() {
    const carsQuery = usePaginatedCarsQuery();

    const onSuccess = async (car: Car) => {
        "use server";

        carsQuery.clearAll();
        redirect(`/account/car/${car.id}/edit`);
    };

    return (
        <div className="create-car-page">
            <h1 className="text-lg font-bold mb-8">Create a new car</h1>
            <CarForm onSuccess={onSuccess} />
        </div>
    );
}
