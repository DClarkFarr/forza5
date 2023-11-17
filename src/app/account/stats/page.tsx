import { Metadata } from "next";

export function metadata(): Metadata {
    return {
        title: "My Stats - Forza5 Calculator",
        description:
            "So much stuff going on here....add your stats dude, ita's not hard.",
    };
}

export default async function MyStatsPage() {
    return (
        <div>
            <div className="flex">
                <div className="flex-1">
                    <h1>My Stats</h1>
                </div>
                <div className="flex-1">
                    <button className="btn bg-sky-700">Add Stat</button>
                </div>
            </div>
        </div>
    );
}
