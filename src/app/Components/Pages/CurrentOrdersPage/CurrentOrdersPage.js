import React from "react";
import './CurrentOrdersPage.css';
import Days from "../../Days/Days";

export default function CurrentOrdersPage(
    {orderIdsByDate, dates, ordersById, setOrders, onOrderChange, onOrderDelete, onOrderDone}
) {
    return (
        <div className='page current-orders-page'>
            <Days
                orderIdsByDate={orderIdsByDate}
                dates={dates}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderChange={onOrderChange}
                onOrderDelete={onOrderDelete}
                onOrderDone={onOrderDone}
            />
        </div>
    );
}
