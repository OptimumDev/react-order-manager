import React from "react";
import './Main.css';
import Days from "../Days/Days";
import Controls from "../Controls/Controls";


export default class Main extends React.Component {
    componentDidMount() {
        this.props.updateDays();
        this.updateDaysInterval = setInterval(this.props.updateDays, 60 * 1000);
    }

    render() {
        const {
            orderIdsByDate, ordersById, setOrders,
            onOrderCreate, onOrderChange, onOrderDelete
        } = this.props;

        return (
            <div className="main">
                <header className='app-header'>
                    <span className='app-name'>Order Manager</span>
                    <Controls
                        datesToCreate={Object.keys(orderIdsByDate).map(d => new Date(d))}
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

    componentWillUnmount() {
        this.updateDaysInterval && clearInterval(this.updateDaysInterval)
    }
}
