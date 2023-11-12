import RegisterForm from "@/components/User/RegisterForm";
import useUser from "@/methods/session/useUser";
import { User } from "@/types/User";
import { Metadata } from "next";

export function metadata(): Metadata {
    return {
        title: "Register - Forza5 Calculator",
        description: "Your first step is here",
    };
}

export default function RegisterPage() {
    return (
        <div className="register-page">
            <h1>Create account here!</h1>
            <RegisterForm />
        </div>
    );
}
