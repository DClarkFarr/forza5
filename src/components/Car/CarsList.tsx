"use client";

import { Car } from "@/types/Car";
import { useMemo } from "react";

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

    const onClickDelete = (id: number) => {};
    return (
        <>
            {!sortedCars.length && (
                <div className="text-center">No cars found</div>
            )}
            {sortedCars.length > 0 && (
                <table>
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
                                                    href={`/admin/cars/${car.id}/edit`}
                                                >
                                                    Edit
                                                </a>
                                                <a
                                                    onClick={() =>
                                                        onClickDelete(car.id)
                                                    }
                                                >
                                                    Delete
                                                </a>
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
