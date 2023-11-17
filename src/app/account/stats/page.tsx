import MyStatsPage from "@/pages/MyStatsPage";
import { Metadata } from "next";

export function metadata(): Metadata {
    return {
        title: "My Stats - Forza5 Calculator",
        description:
            "So much stuff going on here....add your stats dude, ita's not hard.",
    };
}

export default async function StatsPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="font-bold text-lg">My Stats</h1>
            </div>
            <MyStatsPage />
        </div>
    );
}
