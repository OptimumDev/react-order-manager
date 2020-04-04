import React from 'react';
import { connect } from 'react-redux';
import Days from "../Components/Days/Days";

export default connect(
    (state, props) => ({
        orderIdsByDate: state.orderIdsByDate
    }),
    (dispatch, props) => ({})
)(Days);