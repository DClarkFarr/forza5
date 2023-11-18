import { getSessionUser } from "@/actions/sessionActions";
import MyStatsPage from "@/pages/MyStatsPage";
import { getCars, getUserCarsByUserId } from "@/prisma/methods/car";
import { Metadata } from "next";

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

    const userCars = await getUserCarsByUserId(user.id);

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-bold text-lg">My Stats</h1>
            </div>
            <MyStatsPage user={user} cars={cars} userCars={userCars} />
        </div>
    );
}
