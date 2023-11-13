import { getSessionUser } from "@/actions/sessionActions";
import HomeLayout from "@/components/Layout/HomeLayout";
import type { Metadata } from "next";
import Link from "next/link";

export function metadata(): Metadata {
    return {
        title: "Home - Forza5 Calculator",
        description: "Found out which car is REALLY the best",
    };
}

export default async function Home() {
    const user = await getSessionUser();

    return (
        <HomeLayout user={user}>
            <div className="welcome w-full flex flex-col items-center justify-center h-[400px]">
                <div>
                    <h2>Welcome to Forza 5 Calculator!</h2>
                </div>
                <div>
                    {!!user?.id && (
                        <>
                            <Link href="/account" className="btn bg-sky-700">
                                My Account
                            </Link>
                        </>
                    )}
                    {!user?.id && (
                        <div className="flex gap-x-4">
                            <div>
                                <Link href="/login" className="btn bg-sky-700">
                                    Login
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href="/register"
                                    className="btn bg-sky-700"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}
