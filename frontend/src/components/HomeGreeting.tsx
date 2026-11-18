"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/api";

export default function HomeGreeting() {
    const [name, setName] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        getCurrentUser(controller.signal)
            .then(({ name }) => {
                if (!controller.signal.aborted) {
                    setName(name.trim());
                }
            })
            .catch(() => {
            });

        return () => controller.abort();
    }, []);

    return (
        <h2 className="text-3xl font-extrabold leading-tight">
            {name ? `Hey, ${name}!` : "Hey!"}
        </h2>
    );
}
