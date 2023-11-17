"use client";

import { Car } from "@/types/Car";
import { useMemo, useState } from "react";

import styles from "./carList.module.scss";
import { deleteCar } from "@/actions/carActions";

export function CarsList({ cars, isAdmin }: { cars: Car[]; isAdmin: boolean }) {
    const sortedCars = useMemo(() => {
        return cars.sort((a, b) => {
            if (a.make < b.make) return -1;
            if (a.make > b.make) return 1;
            if (a.model < b.model) return -1;
            if (a.model > b.model) return 1;
            return 0;
        });
    }, [cars]);

    const [isDeleting, setDeleting] = useState<boolean | number>(false);

    const onClickDelete = async (id: number) => {
        setDeleting(id);
        await deleteCar(id);
        setDeleting(false);
    };
    return (
        <>
            {!sortedCars.length && (
                <div className="text-center">No cars found</div>
            )}
            {sortedCars.length > 0 && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCars.map((car, index) => {
                            return (
                                <tr key={car.id}>
                                    <td>{car.id}</td>
                                    <td>{car.make}</td>
                                    <td>{car.model}</td>
                                    <td>
                                        {isAdmin && (
                                            <div className="flex gap-x-2">
                                                <a
                                                    href={`/account/car/${car.id}/edit`}
                                                    className="btn-link text-sky-700"
                                                >
                                                    Edit
                                                </a>
                                                <button
                                                    className="btn-link text-red-700"
                                                    onClick={() =>
                                                        onClickDelete(car.id)
                                                    }
                                                    disabled={
                                                        isDeleting === car.id
                                                    }
                                                >
                                                    {isDeleting === car.id
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </>
    );
}
