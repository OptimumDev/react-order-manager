import React from "react";
import './DoneOrdersSection.css';

import Days from "../Days/Days";
import IconButton from "../IconButton/IconButton";
import ColorCounts from "../ColorCounts/ColorCounts";

import {getStatistics} from "../../Utils/statisticHelper";
import {fieldProps} from "../../Constants/OrderFieldProps";

import expandIcon from '../../../images/expand_more-24px.svg'
import hideIcon from '../../../images/expand_less-24px.svg'

export default class DoneOrdersSection extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isExpanded: !this.props.isExpandable
        };
    }

    render() {
        const {isExpandable, children} = this.props;
        const {isExpanded} = this.state;

        return (
            <div className='done-orders-section'>
                <header className='done-orders-header'>
                    <div>{children}</div>
                    {
                        isExpandable &&
                        <IconButton
                            onClick={this.toggleExpanded}
                            icon={isExpanded ? hideIcon : expandIcon}
                            alt={isExpanded ? '▲' : '▼'}
                            className='expand-button'
                        />
                    }
                </header>
                <div className='done-orders-body'>
                    {isExpanded ? this.getDays() : this.getStats()}
                </div>
            </div>
        );
    }

    getDays = () => {
        const {
            doneOrderIdsByDate, ordersById, setOrders, onOrderRestore, skipCount = 0, showCount
        } = this.props;

        return (
            <Days
                orderIdsByDate={doneOrderIdsByDate}
                ordersById={ordersById}
                setOrders={setOrders}
                onOrderRestore={onOrderRestore}
                byDescending={true}
                disableDragging={true}
                skipCount={skipCount}
                showCount={showCount}
            />
        );
    };

    getStats = () => {
        const {doneOrderIdsByDate, ordersById, skipCount = 0, showCount} = this.props;
        const orders = Object.entries(doneOrderIdsByDate)
            .slice(skipCount, skipCount + showCount)
            .flatMap(([_, ids]) => ids.map(id => ordersById[id]));
        const statistics = getStatistics(orders);

        return (
            <div className='done-orders-statistics'>
                <div className='done-orders-sums'>
                    <span>Заказов: {statistics.count}</span>
                    <span>{fieldProps.quantity.name}: {statistics.quantity}</span>
                    <span>{fieldProps.area.name}: {statistics.area}</span>
                </div>
                {orders.length > 0 && <ColorCounts colorCounts={statistics.byColor}/>}
            </div>
        );
    }

    toggleExpanded = () => this.setState({isExpanded: !this.state.isExpanded});
}
