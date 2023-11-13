import LoginLayout from "@/components/Layout/LoginLayout";
import RegisterForm from "@/components/User/RegisterForm";
import { getIronSessionInstance } from "@/methods/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export function metadata(): Metadata {
    return {
        title: "Register - Forza5 Calculator",
        description: "Your first step is here",
    };
}

export default async function RegisterPage() {
    const session = await getIronSessionInstance();

    if (session.user?.id) {
        return redirect("/account");
    }

    return (
        <LoginLayout>
            <div className="register-page">
                <h1 className="mb-3 font-bold text-lg">Create account here!</h1>
                <RegisterForm />
            </div>
        </LoginLayout>
    );
}
