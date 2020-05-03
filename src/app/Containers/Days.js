import { connect } from 'react-redux';
import Days from "../Components/Days/Days";
import {changeOrder, deleteOrder, setOrderIds} from "../Actions";

export default connect(
    (state, props) => ({
        orderIdsByDate: state.orderIdsByDate,
        ordersById: state.ordersById
    }),
    (dispatch, props) => ({
        setOrders: (orders, dateStr) => dispatch(setOrderIds(orders.map(o => o.id), dateStr)),
        onOrderChange: newOrder => dispatch(changeOrder(newOrder)),
        onOrderDelete: (orderId, dateStr) => dispatch(deleteOrder(orderId, dateStr))
    })
)(Days);