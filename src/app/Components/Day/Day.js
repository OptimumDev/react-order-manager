import React from "react";
import './Day.css'
import {ReactSortable} from "react-sortablejs";
import Order from '../Order/Order'
import DayStatistics from "../DayStatistics/DayStatistics";

export default function Day({date, orders, setOrders, onOrderChange, onOrderDelete}) {
    return (
        <div className='day'>
            <div className='date'>
                {new Date(date)
                    .toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', weekday: 'short'})}
            </div>
            <div className='day-data'>
                <ReactSortable
                    className='orders'
                    group='orders'
                    animation={300}
                    list={orders}
                    setList={os => setOrders(os, date)}
                    filter='.editing'
                    preventOnFilter={false}
                >
                    {orders.map(order =>
                        <Order order={order} onChange={onOrderChange} onDelete={onOrderDelete} key={order.id}/>
                    )}
                </ReactSortable>
                {orders.length > 0 && <DayStatistics/>}
            </div>
        </div>
    );
}