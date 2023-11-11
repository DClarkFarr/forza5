import type { Metadata } from "next";
import Link from "next/link";

export function metadata(): Metadata {
    return {
        title: "Home - Forza5 Calculator",
        description: "Found out which car is REALLY the best",
    };
}

export default function Home() {
    return (
        <div className="welcome w-full flex flex-col items-center justify-center h-[400px]">
            <div>
                <h2>Welcome to Forza 5 Calculator!</h2>
            </div>
            <div>
                <Link href="/register" className="btn">
                    Register
                </Link>
            </div>
        </div>
    );
}
