import React from "react";
import './Day.css'
import {ReactSortable} from "react-sortablejs";
import Order from '../../Components/Order/Order'
import DayStatistics from "../DayStatistics/DayStatistics";

export default function Day({dateStr, orders, setOrders, onOrderChange}) {
    return (
        <div className='day'>
            <div className='date'>
                {new Date(dateStr)
                    .toLocaleDateString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric'})}
            </div>
            <div className='day-data'>
                <ReactSortable
                    className='orders'
                    group='orders'
                    animation={300}
                    list={orders}
                    setList={os => setOrders(os, dateStr)}
                >
                    {orders.map(order =>
                        <Order order={order} onChange={onOrderChange} key={order.id}/>
                    )}
                </ReactSortable>
                <DayStatistics/>
            </div>
        </div>
    );
}