"use client";

import { destroySession } from "@/actions/sessionActions";
import { User } from "@/types/User";
import Link from "next/link";

export default function HomeHeader({ user }: { user?: User }) {
    const onClickLogout = async () => {
        destroySession();
    };

    return (
        <div className="header header--home p-4 flex gap-x-3 items-center border-b border-slate-300">
            <div className="header__brand font-bold text-lg">
                Forza 5 Calculator
            </div>

            {!!user?.id && (
                <>
                    <div className="ml-auto">
                        <Link href="/account" className="btn bg-sky-700">
                            My Account
                        </Link>
                    </div>
                    <div onClick={onClickLogout}>
                        <button className="btn bg-sky-700">Logout</button>
                    </div>
                </>
            )}
            {!user?.id && (
                <>
                    <div className="ml-auto">
                        <Link href="/login" className="btn bg-sky-700">
                            Login
                        </Link>
                    </div>
                    <div>
                        <Link href="/register" className="btn bg-sky-700">
                            Register
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
