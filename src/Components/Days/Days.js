import React from "react";
import Day from "../../Containers/Day";

export default function Days({orderIdsByDate}) {
    return (
        <div className='days'>
            {Object.keys(orderIdsByDate).map(dateStr => (
                <Day dateStr={dateStr} key={dateStr} />
            ))}
        </div>
    )
}