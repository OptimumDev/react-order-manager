import React from "react";
import './Main.css';
import Days from "../Days/Days";
import Header from "../Header/Header";
import * as PageNames from "../../Constants/PageNames";


export default class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentPage: PageNames.CURRENT_ORDERS
        }
    }

    componentDidMount() {
        this.props.updateDays();
        this.updateDaysInterval = setInterval(this.props.updateDays, 60 * 1000);
    }

    render() {
        const {
            orderIdsByDate, ordersById, setOrders,
            onOrderCreate, onOrderChange, onOrderDelete
        } = this.props;
        const dates = Object.keys(orderIdsByDate).map(d => new Date(d));

        return (
            <div className="main">
                <Header
                    currentPage={this.state.currentPage}
                    datesToCreate={dates}
                    onPageChange={this.setPage}
                    onOrderCreate={onOrderCreate}
                />
                <Days
                    orderIdsByDate={orderIdsByDate}
                    dates={dates}
                    ordersById={ordersById}
                    setOrders={setOrders}
                    onOrderChange={onOrderChange}
                    onOrderDelete={onOrderDelete}
                />
            </div>
        );
    }

    componentWillUnmount() {
        this.updateDaysInterval && clearInterval(this.updateDaysInterval)
    }

    setPage = page => this.setState({currentPage: page});
}
