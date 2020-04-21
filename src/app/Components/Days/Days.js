import React from "react";
import Day from "../Day/Day";
import './Days.css'

export default class Days extends React.Component {

    mapOrderIds = (orderIds) => orderIds.map(id => (this.props.ordersById[id]));

    mapDay = ([dateStr, orderIds]) => (
        <Day dateStr={dateStr}
             orders={this.mapOrderIds(orderIds)}
             setOrders={this.props.setOrders}
             onOrderChange={this.props.onOrderChange}
             key={dateStr}/>
    );

    mapDays = () => Object.entries(this.props.orderIdsByDate).map(this.mapDay);

    render() {
        return (
            <div className='days'>
                {this.mapDays()}
            </div>
        );
    }
}