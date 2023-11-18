import { Car } from "./Car";

export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    role: "user" | "admin";
}

export type UserCar<C = false> = {
    id: number;
    userId: number;
    carId: number;
    rating: number;
    type: "racing" | "offroad";
    speed: number;
    handling: number;
    acceleration: number;
    launch: number;
    breaking: number;
    offroad: number;
    car: C extends true ? Car : undefined;
};
