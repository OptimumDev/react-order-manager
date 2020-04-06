import React from "react";
import './Order.css'

export default function Order({order, onChange}) {
    return (
        <div className='order-container'>
            <table className='order'>
                <tbody>
                <tr>
                    <th>Номер</th>
                    <td>{order.number}</td>
                </tr>
                <tr>
                    <th>Объект</th>
                    <td>{order.facility}</td>
                </tr>
                <tr>
                    <th>Количество</th>
                    <td>{order.quantity}</td>
                </tr>
                <tr>
                    <th>Площадь</th>
                    <td>{order.area}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}