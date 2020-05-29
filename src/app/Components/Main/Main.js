import React from "react";
import './Main.css';
import Days from "../Days/Days";
import Controls from "../Controls/Controls";

export default function Main({
                                 orderIdsByDate, ordersById, setOrders,
                                 onOrderCreate, onOrderChange, onOrderDelete
                             }) {
    return (
        <div className="main">
            <header className='app-header'>
                <span className='app-name'>Order Manager</span>
                <Controls
                    datesToCreate={Object.keys(orderIdsByDate).map(s => new Date(s))}
                    onOrderCreate={onOrderCreate}
                />
            </header>
            <Days
                orderIdsByDate={orderIdsByDate}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderChange={onOrderChange}
                onOrderDelete={onOrderDelete}
            />
        </div>
    );
}
