import React from "react";
import './Day.css'
import {ReactSortable} from "react-sortablejs";
import DateComponent from "../DateComponent/DateComponent";
import Order from "../Order/Order";

export default class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {orders: props.orders}
    }

    render() {
        return (
            <div className='day'>
                <DateComponent date={this.props.date}/>
                <ReactSortable
                    className='orders'
                    group='orders'
                    animation={300}
                    list={this.state.orders}
                    setList={nextOrders => this.setState({orders: nextOrders})}
                >
                    {this.state.orders.map(order =>
                        <Order key={order.id}>{order.text}</Order>
                    )}
                </ReactSortable>
            </div>
        );
    }
}