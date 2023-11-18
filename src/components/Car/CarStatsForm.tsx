"use client";

import { Car } from "@/types/Car";
import { FormEvent, useMemo, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";

function createSelection(
    field: HTMLInputElement | HTMLTextAreaElement,
    start: number,
    end: number
) {
    console.log("selection range was", field.setSelectionRange);
    if (field.setSelectionRange) {
        field.focus();
        field.setSelectionRange(start, end);
    } else if (typeof field.selectionStart != "undefined") {
        field.selectionStart = start;
        field.selectionEnd = end;
        field.focus();
    }
}

function cursorToEnd(field: HTMLInputElement) {
    field.focus();
    field.selectionStart = field.value.length;
    field.selectionEnd = field.value.length;
}

export default function CarStatsForm({
    cars,
    onSubmit,
}: {
    cars: Car[];
    onSubmit: (data: { rating: number; carId: number }) => Promise<void>;
}) {
    const [formState, setFormState] = useState({ carId: "", rating: "" });

    const [isSubmitting, setSubmitting] = useState(false);

    const carOptions = useMemo(() => {
        return cars.map((car) => {
            return {
                value: car.id,
                label: `${car.make} ${car.model}`,
            };
        });
    }, [cars]);

    const resetForm = () => {
        setFormState({ carId: "", rating: "" });
    };

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!formState.carId || !formState.rating) {
            return;
        }
        setSubmitting(true);

        onSubmit({
            carId: Number(formState.carId),
            rating: Number(formState.rating),
        });

        setSubmitting(false);

        resetForm();
    };

    const ratingRef = useRef<HTMLInputElement>(null);

    const onSelectNextInput = () => {
        ratingRef.current?.focus();
    };

    const onRatingInput = () => {
        if (
            ratingRef.current?.value.length === 1 &&
            Number(ratingRef.current?.value) > 0
        ) {
            ratingRef.current.value += "00";

            createSelection(ratingRef.current, 1, 3);
        } else if (ratingRef.current) {
            ratingRef.current.value = ratingRef.current?.value.replace(
                /\D/g,
                ""
            );

            cursorToEnd(ratingRef.current);
        }

        setFormState({ ...formState, rating: ratingRef.current?.value || "" });
    };

    const onChangeCar = (
        val: SingleValue<{ value: number; label: string }>
    ) => {
        setFormState({ ...formState, carId: String(val?.value || "") });
    };

    return (
        <form
            onSubmit={onFormSubmit}
            className="max-w-full flex gap-x-4 w-[500px]"
        >
            <div className="form-group flex-1">
                <div>
                    <label>Select Car</label>
                    <Select
                        name="carId"
                        options={carOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onMenuClose={onSelectNextInput}
                        onChange={onChangeCar}
                    />
                </div>
            </div>
            <div className="form-group flex-1">
                <div>
                    <label>Car Rating</label>
                    <input
                        type="text"
                        min="400"
                        className="form-control"
                        ref={ratingRef}
                        onInput={onRatingInput}
                    />
                </div>
            </div>
            <div className="form-group">
                <div>
                    <label>&nbsp;</label>
                </div>
                <button
                    className="btn bg-sky-600 hover:bg-sky-700"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Adding..." : "Add"}
                </button>
            </div>
        </form>
    );
}
