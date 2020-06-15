import { connect } from 'react-redux';
import Main from "../Components/Main/Main";
import {
    changeOrder,
    createOrder,
    deleteOrder,
    markOrderDone, restoreOrder,
    setDoneOrderIds,
    setOrderIds,
    updateDays
} from "../Actions";

export default connect(
    (state, props) => ({
        orderIdsByDate: state.orderIdsByDate,
        ordersById: state.ordersById,
        doneOrderIdsByDate: state.doneOrderIdsByDate
    }),
    (dispatch, props) => ({
        setOrders: (orders, date) => dispatch(setOrderIds(orders.map(o => o.id), date)),
        setDoneOrders: (orders, date) => dispatch(setDoneOrderIds(orders.map(o => o.id), date)),
        onOrderCreate: order => dispatch(createOrder(order)),
        onOrderChange: order => dispatch(changeOrder(order)),
        onOrderDelete: order => dispatch(deleteOrder(order)),
        onOrderDone: order => dispatch(markOrderDone(order)),
        onOrderRestore: order => dispatch(restoreOrder(order)),
        updateDays: () => dispatch(updateDays())
    })
)(Main);
