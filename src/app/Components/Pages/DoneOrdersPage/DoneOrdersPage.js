import React from "react";
import './DoneOrdersPage.css';
import Days from "../../Days/Days";

export default function DoneOrdersPage(
    {doneOrderIdsByDate, dates, ordersById, setOrders, onOrderChange, onOrderDelete}
) {
    return (
        <div className='page done-orders-page'>
            <h3>Недавние:</h3>
            <Days
                orderIdsByDate={doneOrderIdsByDate}
                dates={dates}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderChange={onOrderChange}
                onOrderDelete={onOrderDelete}
                byDescending={true}
                disableDragging={true}
                showCount={7}
            />
            <h3>За последний месяц:</h3>
            <Days
                orderIdsByDate={doneOrderIdsByDate}
                dates={dates}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderChange={onOrderChange}
                onOrderDelete={onOrderDelete}
                byDescending={true}
                disableDragging={true}
                showCount={30}
            />
            <h3>Месяц назад:</h3>
            <Days
                orderIdsByDate={doneOrderIdsByDate}
                dates={dates}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderChange={onOrderChange}
                onOrderDelete={onOrderDelete}
                byDescending={true}
                disableDragging={true}
                showCount={30}
                skipCount={30}
            />
            <h3>2 месяца назад:</h3>
            <Days
                orderIdsByDate={doneOrderIdsByDate}
                dates={dates}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderChange={onOrderChange}
                onOrderDelete={onOrderDelete}
                byDescending={true}
                disableDragging={true}
                showCount={30}
                skipCount={60}
            />
        </div>
    );
}
