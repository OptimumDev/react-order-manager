import { connect } from 'react-redux';
import Main from "../Components/Main/Main";
import {changeOrder, createOrder, deleteOrder, setOrderIds, updateDays} from "../Actions";

export default connect(
    (state, props) => ({
        orderIdsByDate: state.orderIdsByDate,
        ordersById: state.ordersById
    }),
    (dispatch, props) => ({
        setOrders: (orders, date) => dispatch(setOrderIds(orders.map(o => o.id), date)),
        onOrderCreate: order => dispatch(createOrder(order)),
        onOrderChange: order => dispatch(changeOrder(order)),
        onOrderDelete: order => dispatch(deleteOrder(order)),
        updateDays: () => dispatch(updateDays())
    })
)(Main);
