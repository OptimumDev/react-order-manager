import {connect} from 'react-redux';
import Controls from "../Components/Controls/Controls";
import {createOrder} from "../Actions";

export default connect(
    (state, props) => ({
        datesToCreate: Object.keys(state.orderIdsByDate).map(s => new Date(s))
    }),
    (dispatch, props) => ({
        onCreate: (order, date) => dispatch(createOrder(order, formatDate(date)))
    })
)(Controls);

const formatDate = date => {
    const monthNumber = date.getMonth() + 1;
    const dayNumber = date.getDate();

    const year = date.getFullYear();
    const month = monthNumber < 10 ? '0' + monthNumber : monthNumber;
    const day = dayNumber < 10 ? '0' + dayNumber : dayNumber;

    return [year, month, day].join('-');
};