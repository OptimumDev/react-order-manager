import React from 'react';
import { connect } from 'react-redux';
import Day from "../Components/Day/Day";
import {setOrderIds} from "../ActionCreators";

export default connect(
    (state, props) => ({
        orderIds: state.orderIdsByDate[props.dateStr],
        dateStr: props.dateStr
    }),
    (dispatch, props) => ({
        setOrderIds: newOrderIds => dispatch(setOrderIds(newOrderIds, props.dateStr))
    })
)(Day);