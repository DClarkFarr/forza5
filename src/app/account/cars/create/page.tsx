import CarForm from "@/components/Car/CarForm";
import { usePaginatedCarsQuery } from "@/queries/car";

export default async function CreateCarPage() {
    const carsQuery = usePaginatedCarsQuery();

    const onSuccess = async () => {
        "use server";

        carsQuery.clearAll();
    };

    return (
        <div className="create-car-page">
            <h1 className="text-lg font-bold mb-8">Create a new car</h1>
            <CarForm onSuccess={onSuccess} />
        </div>
    );
}
