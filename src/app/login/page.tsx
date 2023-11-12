import LoginForm from "@/components/User/LoginForm";
import { getIronSessionInstance } from "@/methods/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export function metadata(): Metadata {
    return {
        title: "Login - Forza5 Calculator",
        description: "Enter your account easily",
    };
}

export default async function RegisterPage() {
    const session = await getIronSessionInstance();

    if (session.user?.id) {
        return redirect("/account");
    }

    return (
        <div className="register-page">
            <h1>Log in here!</h1>
            <LoginForm redirect={"/account"} />
        </div>
    );
}
