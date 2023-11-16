import { useCacheQuery } from "@/prisma/query";
import { Car } from "@/types/Car";

export const useCarQuery = (id: string) => {
    return useCacheQuery<Car>(`/api/car/${id}`);
};
