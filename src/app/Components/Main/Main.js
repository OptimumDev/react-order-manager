import React from "react";
import './Main.css';
import CurrentOrdersPage from "../Pages/CurrentOrdersPage/CurrentOrdersPage";
import Header from "../Header/Header";
import * as PageNames from "../../Constants/PageNames";
import DoneOrdersPage from "../Pages/DoneOrdersPage/DoneOrdersPage";


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
        const {orderIdsByDate, onOrderCreate} = this.props;
        const dates = Object.keys(orderIdsByDate).map(d => new Date(d));

        return (
            <div className="main">
                <Header
                    currentPage={this.state.currentPage}
                    datesToCreate={dates}
                    onPageChange={this.setPage}
                    onOrderCreate={onOrderCreate}
                />
                {this.getPage(dates)}
            </div>
        );
    }

    getPage = dates => {
        const {
            orderIdsByDate, ordersById, doneOrderIdsByDate,
            setOrders, setDoneOrders, onOrderChange, onOrderDelete
        } = this.props;
        switch (this.state.currentPage) {
            case PageNames.CURRENT_ORDERS:
                return (
                    <CurrentOrdersPage
                        orderIdsByDate={orderIdsByDate}
                        dates={dates}
                        ordersById={ordersById}
                        setOrders={setOrders}
                        onOrderChange={onOrderChange}
                        onOrderDelete={onOrderDelete}
                    />
                );
            case PageNames.DONE_ORDERS:
                return (
                    <DoneOrdersPage
                        doneOrderIdsByDate={doneOrderIdsByDate}
                        dates={dates}
                        ordersById={ordersById}
                        setOrders={setDoneOrders}
                        onOrderChange={onOrderChange}
                        onOrderDelete={onOrderDelete}
                    />
                );
            default:
                console.error(`Can't load page with name "${this.state.currentPage}"`);
        }
    };

    componentWillUnmount() {
        this.updateDaysInterval && clearInterval(this.updateDaysInterval)
    }

    setPage = page => this.setState({currentPage: page});
}
