import { connect } from 'react-redux';
import Main from "../Components/Main/Main";
import {changeOrder, createOrder, deleteOrder, setOrderIds} from "../Actions";

export default connect(
    (state, props) => ({
        orderIdsByDate: state.orderIdsByDate,
        ordersById: state.ordersById
    }),
    (dispatch, props) => ({
        setOrders: (orders, dateStr) => dispatch(setOrderIds(orders.map(o => o.id), dateStr)),
        onOrderCreate: (order, date) => dispatch(createOrder(order, formatDate(date))),
        onOrderChange: newOrder => dispatch(changeOrder(newOrder)),
        onOrderDelete: (orderId, dateStr) => dispatch(deleteOrder(orderId, dateStr))
    })
)(Main);

const formatDate = date => {
    const monthNumber = date.getMonth() + 1;
    const dayNumber = date.getDate();

    const year = date.getFullYear();
    const month = monthNumber < 10 ? '0' + monthNumber : monthNumber;
    const day = dayNumber < 10 ? '0' + dayNumber : dayNumber;

    return [year, month, day].join('-');
};