import React from "react";
import './Days.css'
import Day from "../Day/Day";
import {orderBy} from "../../Utils/arrayHelper";

export default class Days extends React.Component {
    render() {
        return (
            <div className='days'>
                {this.mapDays()}
            </div>
        );
    }

    mapDays = () => orderBy(
        Object.entries(this.props.orderIdsByDate),
        ([date,]) => new Date(date)
    ).map(this.mapDay);

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