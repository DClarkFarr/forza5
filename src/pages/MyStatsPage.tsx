"use client";
import { createUserCar } from "@/actions/carActions";
import CarStatsForm from "@/components/Car/CarStatsForm";
import { Car } from "@/types/Car";
import { User, UserCar } from "@/types/User";
import { useState } from "react";

import styles from "@/components/car/carList.module.scss";
import StatInput from "@/components/Control/StatInput";
import { deleteUserCar, updateUserCarStat } from "@/actions/userCarActions";

export default function MyStatsPage({
    cars,
    userCars,
    user,
}: {
    user: User;
    cars: Car[];
    userCars: UserCar<true>[];
}) {
    const [showForm, setShowForm] = useState(false);

    const submitUserCar = async (data: { rating: number; carId: number }) => {
        await createUserCar(user.id, data);
    };

    const saveUserCarStat = (
        userCarId: number,
        column: keyof Omit<UserCar, "id" | "userId" | "carId">,
        value: number
    ) => {
        updateUserCarStat(userCarId, column, value);
    };

    const onDeleteUserCar = (userCarId: number) => {
        deleteUserCar(user.id, userCarId);
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
                            <th>
                                <div className="pl-3">Action</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCars.map((userCar) => (
                            <tr key={userCar.id}>
                                <th>
                                    {userCar.car.make} {userCar.car.model}
                                </th>
                                <td>{userCar.rating}</td>
                                <td>
                                    <StatInput
                                        initialValue={userCar.speed}
                                        onChange={saveUserCarStat.bind(
                                            null,
                                            userCar.id,
                                            "speed"
                                        )}
                                    />
                                </td>
                                <td>
                                    <StatInput
                                        initialValue={userCar.handling}
                                        onChange={saveUserCarStat.bind(
                                            null,
                                            userCar.id,
                                            "handling"
                                        )}
                                    />
                                </td>
                                <td>
                                    <StatInput
                                        initialValue={userCar.acceleration}
                                        onChange={saveUserCarStat.bind(
                                            null,
                                            userCar.id,
                                            "acceleration"
                                        )}
                                    />
                                </td>
                                <td>
                                    <StatInput
                                        initialValue={userCar.launch}
                                        onChange={saveUserCarStat.bind(
                                            null,
                                            userCar.id,
                                            "launch"
                                        )}
                                    />
                                </td>
                                <td>
                                    <StatInput
                                        initialValue={userCar.breaking}
                                        onChange={saveUserCarStat.bind(
                                            null,
                                            userCar.id,
                                            "breaking"
                                        )}
                                    />
                                </td>
                                <td>
                                    <StatInput
                                        initialValue={userCar.offroad}
                                        onChange={saveUserCarStat.bind(
                                            null,
                                            userCar.id,
                                            "offroad"
                                        )}
                                    />
                                </td>
                                <td>Score</td>
                                <td>
                                    <button
                                        className="btn-link text-red-600"
                                        tabIndex={-1}
                                        onClick={onDeleteUserCar.bind(
                                            null,
                                            userCar.id
                                        )}
                                    >
                                        Delete
                                    </button>
                                </td>
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
