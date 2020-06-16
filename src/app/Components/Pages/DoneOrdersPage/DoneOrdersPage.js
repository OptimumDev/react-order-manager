import React from "react";
import './DoneOrdersPage.css';
import DoneOrdersSection from "../../DoneOrdersSection/DoneOrdersSection";

export default function DoneOrdersPage({doneOrderIdsByDate, ordersById, setOrders, onOrderRestore}) {
    return (
        <div className='page done-orders-page'>
            <DoneOrdersSection
                doneOrderIdsByDate={doneOrderIdsByDate}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderRestore={onOrderRestore}
                isExpandable={false}
                showCount={7}
            >
                Недавние
            </DoneOrdersSection>
            <DoneOrdersSection
                doneOrderIdsByDate={doneOrderIdsByDate}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderRestore={onOrderRestore}
                isExpandable={true}
                showCount={30}
            >
                За последний месяц
            </DoneOrdersSection>
            <DoneOrdersSection
                doneOrderIdsByDate={doneOrderIdsByDate}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderRestore={onOrderRestore}
                isExpandable={true}
                showCount={30}
                skipCount={30}
            >
                Месяц назад
            </DoneOrdersSection>
            <DoneOrdersSection
                doneOrderIdsByDate={doneOrderIdsByDate}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderRestore={onOrderRestore}
                isExpandable={true}
                showCount={30}
                skipCount={60}
            >
                2 месяца назад
            </DoneOrdersSection>
        </div>
    );
}
