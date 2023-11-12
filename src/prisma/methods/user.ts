import { validateEmail } from "@/methods/validate";
import { prisma } from "@/prisma";

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    if (!validateEmail(email)) {
        throw new Error("Invalid email");
    }
    if (name.length < 3) {
        throw new Error("Name must be at least 3 characters");
    }
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw new Error("User with this email already exists");
    }

    const user = await prisma.user.create({ data: { email, name, password } });

    return user;
};

export const loginUser = async (email: string, password: string) => {
    if (!validateEmail(email)) {
        throw new Error("Invalid email");
    }
    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
        throw new Error("User not found");
    }

    if (existing.password !== password) {
        throw new Error("Invalid password");
    }

    return existing;
};
