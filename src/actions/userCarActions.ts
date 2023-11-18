"use server";

import { updateUserCarColumn } from "@/prisma/methods/userCar";
import { getPaginatedUserCarsQuery } from "@/queries/car";
import { UserCar } from "@/types/User";

export async function updateUserCarStat(
    userCarId: number,
    column: keyof Omit<UserCar, "id" | "userId" | "carId">,
    value: number
) {
    await updateUserCarColumn(userCarId, column, value);
    const query = getPaginatedUserCarsQuery();
    await query.clearAll();
}
