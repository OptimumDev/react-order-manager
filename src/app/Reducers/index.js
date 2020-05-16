import * as actionTypes from '../Constants/ActionTypes';
import {createReducer} from 'redux-create-reducer';
import {v4 as uuidv4} from "uuid";

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();

export const defaultState = {
    ordersById: {
        [id1]: {
            id: id1,
            number: '1234.5',
            facility: 'Объект 1',
            quantity: 123,
            area: 100,
            color: '#ff0000'
        },
        [id2]: {
            id: id2,
            number: '3456',
            facility: 'Объект 2',
            quantity: 300,
            area: 500,
            color: '#00ff00'
        },
        [id3]: {
            id: id3,
            number: '789',
            facility: 'Объект 3',
            quantity: 467,
            area: 425,
            color: '#0000ff'
        },
        [id4]: {
            id: id4,
            number: '6754.1',
            facility: 'Объект 4',
            quantity: 10,
            area: 23,
            color: '#ffff00'
        }
    },
    orderIdsByDate: {
        '2020-04-01': [id1, id2],
        '2019-12-31': [id3, id4],
    },
};

const setOrderIds = (state, {payload}) => ({
    ...state,
    orderIdsByDate: {
        ...state.orderIdsByDate,
        [payload.dateStr]: payload.newOrderIds
    }
});

const changeOrder = (state, {payload}) => ({
    ...state,
    ordersById: {
        ...state.ordersById,
        [payload.newOrder.id]: payload.newOrder
    }
});

const createOrder = (state, {payload}) => {
    const id = uuidv4();

    return {
        ...state,
        ordersById: {
            ...state.ordersById,
            [id]: {...payload.order, id}
        },
        orderIdsByDate: {
            ...state.orderIdsByDate,
            [payload.dateStr]: state.orderIdsByDate[payload.dateStr].concat(id)
        }
    };
};

const deleteOrder = (state, {payload}) => {
    const {[payload.orderId]: _, ...newOrdersById} = state.ordersById;
    return {
        ...state,
        ordersById: newOrdersById,
        orderIdsByDate: {
            ...state.orderIdsByDate,
            [payload.dateStr]: state.orderIdsByDate[payload.dateStr].filter(id => id !== payload.orderId)
        }
    }
};

export const rootReducer = createReducer(defaultState, {
    [actionTypes.SET_ORDER_IDS]: setOrderIds,
    [actionTypes.CHANGE_ORDER]: changeOrder,
    [actionTypes.CREATE_ORDER]: createOrder,
    [actionTypes.DELETE_ORDER]: deleteOrder,
});