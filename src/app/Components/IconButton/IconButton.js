import React from "react";
import './IconButton.css';

export default function IconButton({onClick, icon, alt, className = '', ...props}) {
    return (
        <button className={`icon-button ${className}`} onClick={onClick} {...props}>
            <img src={icon} alt={alt}/>
        </button>
    );
}
