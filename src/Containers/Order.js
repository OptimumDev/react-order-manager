import React from 'react';
import { connect } from 'react-redux';
import Order from "../Components/Order/Order";

export default connect(
    (state, props) => {
        if (!state.ordersById[props.orderId])
        {
            console.log(props.orderId);
        }

        return ({
            order: state.ordersById[props.orderId]
        });
    },
    (dispatch, props) => ({})
)(Order);