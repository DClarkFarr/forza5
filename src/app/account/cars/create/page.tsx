import CarForm from "@/components/Car/CarForm";

export default async function CreateCarPage() {
    return (
        <div className="create-car-page">
            <h1 className="text-lg font-bold mb-8">Create a new car</h1>
            <CarForm />
        </div>
    );
}
