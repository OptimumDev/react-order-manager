import React from "react";
import './Days.css'
import Day from "../Day/Day";

export default class Days extends React.Component {
    render() {
        return (
            <div className='days'>
                {Array.from(this.props.orderIdsByDate).map(this.mapDay)}
            </div>
        );
    }

    mapOrderIds = (orderIds) => orderIds.map(id => (this.props.ordersById[id]));

    mapDay = ([date, orderIds]) => (
        <Day
            date={date}
            orders={this.mapOrderIds(orderIds)}
            setOrders={this.props.setOrders}
            onOrderChange={this.props.onOrderChange}
            onOrderDelete={orderId => this.props.onOrderDelete(orderId, date)}
            key={date.toString()}
        />
    );
}