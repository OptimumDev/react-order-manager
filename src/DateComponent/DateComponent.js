import React from "react";
import './DateComponent.css'

const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];


function DateComponent({date}) {
    return (
        <div className='date'>
            <div className='month'>
                {monthNames[date.getMonth()]}
            </div>
            <div className='day-of-month'>
                {date.getDate()}
            </div>
        </div>
    )
}

export default DateComponent;