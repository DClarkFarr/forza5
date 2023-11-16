import { useCacheQuery } from "@/prisma/query";
import { Car } from "@/types/Car";
import { revalidateTag } from "next/cache";

export const useCarQuery = (id: string) => {
    return useCacheQuery<Car>(`/api/car/${id}`);
};

export const usePaginatedCarsQuery = (page: number = 1) => {
    const query = useCacheQuery<Car[]>(`/api/car`, { page }, null, [
        `/api/car/${page}`,
        "/api/car",
    ]);

    return Object.assign(query, {
        clearAll: async () => {
            "use server";

            revalidateTag("/api/car");
        },
    });
};
