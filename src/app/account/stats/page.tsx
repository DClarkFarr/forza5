import { Metadata } from "next";
import { getSessionUser } from "@/actions/sessionActions";
import { createUserCar } from "@/actions/carActions";
import { deleteUserCar, updateUserCarStat } from "@/actions/userCarActions";

import MyStatsPage from "@/pages/MyStatsPage";
import { getCars } from "@/prisma/methods/car";
import { getPaginatedUserCars } from "@/prisma/methods/userCar";

export function metadata(): Metadata {
    return {
        title: "My Stats - Forza5 Calculator",
        description:
            "So much stuff going on here....add your stats dude, ita's not hard.",
    };
}

export default async function StatsPage() {
    const cars = await getCars({ limit: 1000 });
    const user = await getSessionUser();

    if (!user?.id) {
        return <div>Not logged in</div>;
    }

    const userCars = await getPaginatedUserCars(user.id, 0, 1000, true);

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-bold text-lg">My Stats</h1>
            </div>
            <MyStatsPage
                user={user}
                cars={cars}
                userCars={userCars}
                onCreate={createUserCar}
                onDelete={deleteUserCar}
                onUpdate={updateUserCarStat}
            />
        </div>
    );
}
