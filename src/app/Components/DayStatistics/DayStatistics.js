import React from "react";
import './DayStatistics.css'

import ColorCounts from "../ColorCounts/ColorCounts";

import {fieldProps} from "../../Constants/OrderFieldProps";
import {getStatistics} from "../../Utils/statisticHelper";

export default function DayStatistics({orders}) {
    const statistics = getStatistics(orders);
    return (
        <div className='day-statistics'>
            <table className='order-data'>
                <caption>Итого:</caption>
                <tbody>
                <tr>
                    <th>{fieldProps.quantity.name}</th>
                    <td>{statistics.quantity}</td>
                </tr>
                <tr>
                    <th>{fieldProps.area.name}</th>
                    <td>{statistics.area}</td>
                </tr>
                <tr>
                    <th>Заказов</th>
                    <td>{statistics.count}</td>
                </tr>
                </tbody>
            </table>
            <ColorCounts colorCounts={statistics.byColor}/>
        </div>
    );
}
