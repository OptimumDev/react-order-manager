import React from "react";
import './ColorCounts.css';
import {textColors} from "../../Constants/Colors";

export default function ColorCounts({colorCounts}) {
    return (
        <div className='color-counts'>
            {getColorCounts(colorCounts)}
        </div>
    );
}

function getColorCounts(colorCounts) {
    return Object.entries(colorCounts)
        .filter(([_, count]) => count > 0)
        .map(([color, count]) => (
            <span style={{backgroundColor: color, color: textColors[color]}} className='color-count'>
                {count}
            </span>
        ));
}
