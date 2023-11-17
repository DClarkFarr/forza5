import { useForm } from "react-hook-form";

export default function CarStatsForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
        defaultValues: { rating: 0, carId: null } as {
            rating: number;
            carId: number | null;
        },
    });

    const onFormSubmit = () => {
        return handleSubmit((data) => {});
    };

    return (
        <form
            onSubmit={onFormSubmit()}
            className="max-w-full flex gap-x-4 w-[500px]"
        >
            <div className="form-group">
                <div>
                    <label>Select Car</label>
                </div>
            </div>
            <div className="form-group">
                <div>
                    <label>Car Rating</label>
                </div>
            </div>
            <div className="form-group">
                <div>
                    <label>&nbsp;</label>
                </div>
                <button className="btn bg-sky-600 hover:bg-sky-700">Add</button>
            </div>
        </form>
    );
}
