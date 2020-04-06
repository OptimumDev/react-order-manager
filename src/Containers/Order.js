import React from 'react';
import {connect} from 'react-redux';
import Order from "../Components/Order/Order";
import {changeOrder} from "../ActionCreators";

export default connect(
    (state, props) => ({
        order: state.ordersById[props.orderId]
    }),
    (dispatch, props) => ({
        onChange: newOrder => dispatch(changeOrder(props.orderId, newOrder))
    })
)(Order);