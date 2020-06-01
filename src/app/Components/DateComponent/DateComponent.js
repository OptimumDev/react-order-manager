import React from "react";
import './DateComponent.css';
import "react-datepicker/dist/react-datepicker.css";

export default function DateComponent({date}) {
    const dateObj = new Date(date);
    const [weekday, monthAndDay] = dateObj
        .toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', weekday: 'short'})
        .split(', ');
    const day = dateObj.getDay();
    const isWeekend = day === 0 || day === 6;

    return (
        <div className='date'>
            <span className={isWeekend ? 'weekend' : ''}>
                {weekday[0].toUpperCase() + weekday.slice(1)}
            </span>
            <span>, {monthAndDay}</span>
        </div>
    );
}
