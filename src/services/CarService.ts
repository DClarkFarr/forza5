import webApi from "./webApi";
import { CarFormState } from "@/components/Car/CarForm";
import { Car } from "@/types/Car";

export default class CarService {
    static create(data: CarFormState): Promise<Car> {
        return webApi.post("/car", data).then(({ data }) => data);
    }

    static update(id: number, data: CarFormState): Promise<Car> {
        return webApi.put(`/car/${id}`, data).then(({ data }) => data);
    }
}
