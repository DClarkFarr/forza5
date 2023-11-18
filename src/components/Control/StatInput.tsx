"use client";

import { FormEvent, useRef, useState } from "react";

export default function StatInput({
    initialValue,
    onChange,
}: {
    initialValue: number;
    onChange: (value: number) => void;
}) {
    const [value, setValue] = useState(initialValue);

    const inputRef = useRef<HTMLInputElement>(null);

    const onInput = (e: FormEvent<HTMLInputElement>) => {
        const toSet = Number(e.currentTarget.value);
        setValue(toSet);

        onChange(toSet);
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="number"
                step="0.1"
                min="0"
                max="10"
                className="form-control"
                defaultValue={value}
                onInput={onInput}
            />
        </div>
    );
}
