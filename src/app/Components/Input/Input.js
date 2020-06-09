import React from "react";
import './Input.css';

export default function Input({type, value, onChange, className, required, ...props}) {
    return (
        <input
            type={type}
            defaultValue={value}
            onChange={e => onChange(e.target.valueAsNumber || e.target.value)}
            className={className}
            required={required}
            min={0}
            {...props}
        />
    );
}
