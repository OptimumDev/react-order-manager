import React from "react";
import './Days.css'
import Day from "../Day/Day";
import {orderBy} from "../../Utils/arrayHelper";
import {toISODateString} from "../../Utils/DateHelper";

export default class Days extends React.Component {
    render() {
        return (
            <div className='days'>
                {this.mapDays()}
            </div>
        );
    }

    mapDays = () => {
        const {orderIdsByDate, showCount, skipCount = 0, skipEmpty = false, byDescending = false} = this.props;
        let entries = Object.entries(orderIdsByDate).filter(([, ids]) => !skipEmpty || ids.length > 0);
        if (showCount != null)
            entries = entries.slice(skipCount, skipCount + showCount);

        return orderBy(
            entries,
            ([date,]) => new Date(date),
            byDescending
        ).map(this.mapDay);
    };

    mapOrderIds = (orderIds) => orderIds.map(id => (this.props.ordersById[id]));

    mapDay = ([date, orderIds]) => {
        const {
            dates, setOrders, onOrderChange, onOrderDelete, onOrderDone, onOrderRestore,
            disableDragging = false
        } = this.props;
        return (
            <Day
                date={date}
                orders={this.mapOrderIds(orderIds)}
                datesToCreate={dates}
                setOrders={setOrders}
                onOrderChange={onOrderChange}
                onOrderDelete={order => onOrderDelete(order, date)}
                onOrderDone={onOrderDone}
                onOrderRestore={onOrderRestore}
                disableDragging={disableDragging}
                key={toISODateString(date)}
            />
        );
    };
}