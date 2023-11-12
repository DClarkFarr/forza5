"use server";

import { User } from ".prisma/client";
import { getIronSessionInstance } from "@/methods/session";

export const initializeSession = async (user: User) => {
    const session = await getIronSessionInstance();
    session.user = user;
    await session.save();
};

export const destroySession = async () => {
    const session = await getIronSessionInstance();
    session.destroy();
};

export const getSessionUser = async () => {
    const session = await getIronSessionInstance();
    return session.user;
};
