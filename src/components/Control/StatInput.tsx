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

    const onFocusSelect = () => {
        inputRef.current?.select();
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="number"
                step="0.1"
                min="0"
                max="10"
                className="form-control w-20 pr-1 pl-2"
                defaultValue={value}
                onInput={onInput}
                onFocus={onFocusSelect}
            />
        </div>
    );
}
