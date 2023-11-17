"use client";
import CarStatsForm from "@/components/Car/CarStatsForm";
import { useState } from "react";

export default function MyStatsPage() {
    const [showForm, setShowForm] = useState(false);

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
                        <CarStatsForm />
                    </div>
                )}
            </div>
        </div>
    );
}
