"use client";

import { User } from "@/types/User";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/components/Layout/layout.module.scss";
import { destroySession } from "@/actions/sessionActions";

export default function AccountHeader({ user }: { user: User }) {
    const onClickLogout = async () => {
        destroySession();
    };

    const pathname = usePathname();

    const bindLink = (href: string, toMatch = href, nested = false) => {
        const isActive = nested
            ? !!(pathname || "").match(new RegExp(`^${toMatch}`))
            : toMatch === pathname;

        return {
            href,
            className: `btn-link text-sky-700 ${styles.navLink}`,
            "data-active": isActive,
        };
    };

    return (
        <div className="header header--account p-4 border-b border-slate-300 mb-8 text-slate-500">
            <div
                className={`header__container mx-auto flex gap-x-3 items-center max-w-screen-xl`}
            >
                <div className="header__brand font-bold text-lg">
                    Forza 5 Calculator
                </div>

                <div className="ml-auto">Welcome, {user.name}</div>
                <div className="">
                    <Link {...bindLink("/account")}>Dashboard</Link>
                </div>
                <div>
                    <Link {...bindLink("/account/stats")}>My Stats</Link>
                </div>
                <div>
                    <Link {...bindLink("/account/cars", "/account/car", true)}>
                        Manage Cars
                    </Link>
                </div>
                <div onClick={onClickLogout}>
                    <button className="btn-link text-sky-700">Logout</button>
                </div>
            </div>
        </div>
    );
}
