import React from "react";
import './DayStatistics.css'
import {fieldProps} from "../../Constants/OrderFieldProps";
import {sum} from "../../Utils/arrayHelper";

export default function DayStatistics({orders}) {
    return (
        <div className='day-statistics'>
            <table className='order-data'>
                <thead>Итого:</thead>
                <tbody>
                <tr>
                    <th>{fieldProps.quantity.name}</th>
                    <td>{sum(orders, o => o.quantity)}</td>
                </tr>
                <tr>
                    <th>{fieldProps.area.name}</th>
                    <td>{sum(orders, o => o.area)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}