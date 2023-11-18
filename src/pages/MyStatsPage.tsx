"use client";
import { createUserCar } from "@/actions/carActions";
import CarStatsForm from "@/components/Car/CarStatsForm";
import { Car } from "@/types/Car";
import { User, UserCar } from "@/types/User";
import { useState } from "react";

import styles from "@/components/car/carList.module.scss";

export default function MyStatsPage({
    cars,
    userCars,
    user,
}: {
    user: User;
    cars: Car[];
    userCars: UserCar[];
}) {
    const [showForm, setShowForm] = useState(false);

    const submitUserCar = async (data: { rating: number; carId: number }) => {
        await createUserCar(user.id, data);
    };

    return (
        <div>
            <div className="flex">
                {!showForm && (
                    <div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="btn bg-sky-700"
                        >
                            Add Stat
                        </button>
                    </div>
                )}
                {showForm && (
                    <div>
                        <CarStatsForm cars={cars} onSubmit={submitUserCar} />
                    </div>
                )}
            </div>

            {userCars.length && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Car</th>
                            <th>Rating</th>
                            <th>Speed</th>
                            <th>Handling</th>
                            <th>Acceleration</th>
                            <th>Launch</th>
                            <th>Breaking</th>
                            <th>Offroat</th>
                            <th>Score</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCars.map((userCar) => (
                            <tr key={userCar.id}>
                                <th>Car</th>
                                <th>{userCar.rating}</th>
                                <th>{userCar.speed}</th>
                                <th>{userCar.handling}</th>
                                <th>{userCar.acceleration}</th>
                                <th>{userCar.launch}</th>
                                <th>{userCar.breaking}</th>
                                <th>{userCar.offroad}</th>
                                <th>Score</th>
                                <th>Action</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!userCars.length && (
                <div className="my-4">
                    <div className="text-gray-600 bg-sky-200 p-4">
                        You haven&apos;t added any stats yet.
                    </div>
                </div>
            )}
        </div>
    );
}
