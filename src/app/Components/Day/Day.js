import React from "react";
import './Day.css'
import {ReactSortable} from "react-sortablejs";
import Order from '../Order/Order'
import DayStatistics from "../DayStatistics/DayStatistics";
import DateComponent from "../DateComponent/DateComponent";

export default function Day(
    {date, orders, datesToCreate, setOrders, onOrderChange, onOrderDelete, disableDragging = false}
) {
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
                    disabled={disableDragging}
                >
                    {orders.map(order =>
                        <Order
                            key={order.id}
                            order={order}
                            datesToCreate={datesToCreate}
                            onChange={onOrderChange}
                            onDelete={onOrderDelete}
                        />
                    )}
                </ReactSortable>
                {orders.length > 0 && <DayStatistics orders={orders}/>}
            </div>
        </div>
    );
}