import React from "react";
import './Day.css'
import {ReactSortable} from "react-sortablejs";
import Order from '../Order/Order'
import DayStatistics from "../DayStatistics/DayStatistics";

export default function Day({date, orders, setOrders, onOrderChange, onOrderDelete}) {
    return (
        <div className='day'>
            <div className='date'>
                {date.toLocaleDateString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric'})}
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
                <DayStatistics/>
            </div>
        </div>
    );
}