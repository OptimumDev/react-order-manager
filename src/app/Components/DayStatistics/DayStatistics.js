import React from "react";
import './DayStatistics.css'
import {fieldProps} from "../../Constants/OrderFieldProps";
import {colors, textColors} from "../../Constants/Colors";

export default function DayStatistics({orders}) {
    const statistics = getStatistics(orders);
    return (
        <div className='day-statistics'>
            <table className='order-data'>
                <thead>Итого:</thead>
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
            <div className='color-counts'>
                {getColorCounts(statistics.byColor)}
            </div>
        </div>
    );
}

function getColorCounts(byColor) {
    return Object.entries(byColor)
        .filter(([_, count]) => count > 0)
        .map(([color, count]) => (
            <span style={{backgroundColor: color, color: textColors[color]}} className='color-count'>
                {count}
            </span>
        ));
}

function getStatistics(orders) {
    return orders.reduce((acc, order) => {
        acc.count += 1;
        acc.quantity += order.quantity;
        acc.area += order.area;
        acc.byColor[order.color] += 1;

        return acc;
    }, {
        count: 0,
        quantity: 0,
        area: 0,
        byColor: colors.reduce((acc, color) => {
            acc[color] = 0;
            return acc;
        }, {})
    });
}