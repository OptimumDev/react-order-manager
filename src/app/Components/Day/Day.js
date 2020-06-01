import React from "react";
import './Day.css'
import {ReactSortable} from "react-sortablejs";
import Order from '../Order/Order'
import DayStatistics from "../DayStatistics/DayStatistics";
import DateComponent from "../DateComponent/DateComponent";

export default function Day({date, orders, setOrders, onOrderChange, onOrderDelete}) {
    return (
        <div className='day'>
            <DateComponent date={date}/>
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