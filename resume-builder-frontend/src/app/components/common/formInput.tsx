import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import "./basicInput.css";

export default function FormInput({ label, field, type = "text" }: { label: string; field: string; type?: string }) {
    const { register, watch } = useFormContext();
    const [focused, setFocused] = useState(false);
    const value = watch(field);

    return (
        <div className="relative my-3 w-full">
            <motion.label
                htmlFor={field}
                initial={{ fontSize: "1rem" }}
                animate={{
                    y: focused || value ? -16 : 0,
                    fontSize: focused || value ? "0.7rem" : "1rem",
                    color: focused || value ? "#4682b4" : "#434d57",
                }}
                transition={{ duration: 0.2 }}
                className="w-full absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
                {label}
            </motion.label>
            <input
                id={field}
                className={`w-full pl-3 pt-4 pb-1 border-b-2 border-accent outline-none focus:border-primary ${value ? "filled" : ""}`}
                placeholder=" "
                {...register(field)}
                type={type}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    );
}
