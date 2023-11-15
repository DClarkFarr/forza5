"use client";

import CarService from "@/services/CarService";
import { Car } from "@/types/Car";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import FormError from "../Form/FormError";

export type CarFormState = {
    make: string;
    model: string;
};
export type CarFormProps = {
    car?: Car;
    onSubmit?: (data: CarFormState) => Promise<Car>;
    onSuccess?: (user: Car) => void;
};
export default function CarForm(props: CarFormProps) {
    const { push } = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            make: props.car?.make || "",
            model: props.car?.model || "",
        },
    });

    const [mainError, setMainError] = useState("");

    const tr = useMemo(() => {
        return {
            buttonDefault: props.car?.id ? "Update Car" : "Create Car",
            buttonSubmitting: props.car?.id
                ? "Updating Car..."
                : "Creating Car...",
        };
    }, [props.car]);

    const handleCreateCar = async (data: CarFormState) => {
        const createMethod =
            typeof props.onSubmit === "function"
                ? props.onSubmit
                : CarService.create;

        try {
            const car = await createMethod(data);
            if (typeof props.onSuccess === "function") {
                props.onSuccess(car);
            } else {
                push(`/account/car/${car.id}/edit`);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                setMainError(
                    err.response?.data.message || "Error creating car"
                );
            }
        }
    };
    const onFormSubmit = () => {
        return handleSubmit((data) => {
            setMainError("");
            if (props.car) {
            } else {
                return handleCreateCar(data);
            }
        });
    };

    return (
        <form onSubmit={onFormSubmit()} className="max-w-full w-[400px]">
            <div className="form-group">
                <label className="block">Make</label>
                <input
                    {...register("make", {
                        required: "Make must be at least 2 chars",
                        minLength: 2,
                    })}
                    placeholder="Ford, Toyota, etc."
                    className="form-control"
                />
                {errors.make?.message && (
                    <FormError message={errors.make.message} />
                )}
            </div>
            <div className="form-group">
                <label className="block">Model</label>
                <input
                    {...register("model", {
                        required: true,
                        minLength: 2,
                    })}
                    placeholder="Focus 2018, etc"
                    className="form-control"
                />
                {errors.model?.message && (
                    <FormError message={errors.model.message} />
                )}
            </div>

            <div className="form-group">
                {mainError && <FormError message={mainError} />}
            </div>

            <div className="pt-2">
                <button
                    className="btn block w-full bg-sky-700"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {isSubmitting ? tr.buttonSubmitting : tr.buttonDefault}
                </button>
            </div>
        </form>
    );
}
