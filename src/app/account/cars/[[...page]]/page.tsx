import { getSessionUser } from "@/actions/sessionActions";
import { CarsList } from "@/components/Car/CarsList";
import { usePaginatedCarsQuery } from "@/queries/car";
import Link from "next/link";

export default async function AccountCardsPage({
    params,
}: {
    params: { page: string };
}) {
    const pageNum = Number(params.page) || 1;

    const carsQuery = usePaginatedCarsQuery(pageNum);
    const cars = await carsQuery.query();
    const user = (await getSessionUser())!;

    return (
        <div>
            <div className="mb-4">
                <div className="flex flex-col w-full">
                    <div className="ml-auto">
                        <Link href="cars/create" className="btn bg-sky-700">
                            Create New Car
                        </Link>
                    </div>
                </div>
            </div>
            <CarsList cars={cars} isAdmin={user.role === "admin"} />
        </div>
    );
}
