import * as actionTypes from '../Constants/ActionTypes';
import {createReducer} from 'redux-create-reducer';
import {v4 as uuidv4} from "uuid";

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export const defaultState = {
    ordersById: {
        [id1]: {
            id: id1,
            number: '1234.5',
            facility: 'Объект 1',
            quantity: 123,
            area: 100,
            color: '#ff0000',
            date: today
        },
        [id2]: {
            id: id2,
            number: '3456',
            facility: 'Объект 2',
            quantity: 300,
            area: 500,
            color: '#00ff00',
            date: today
        },
        [id3]: {
            id: id3,
            number: '789',
            facility: 'Объект 3',
            quantity: 467,
            area: 425,
            color: '#0000ff',
            date: tomorrow
        },
        [id4]: {
            id: id4,
            number: '6754.1',
            facility: 'Объект 4',
            quantity: 10,
            area: 23,
            color: '#ffff00',
            date: tomorrow
        }
    },
    // TODO change for Immutable.Map
    orderIdsByDate: new Map([
        [today, [id1, id2]],
        [tomorrow, [id3, id4]]
    ])
};

const setOrderIds = (state, {payload}) => ({
    ...state,
    orderIdsByDate: new Map([
        ...state.orderIdsByDate,
        [payload.date, payload.orderIds]
    ])
});

const changeOrder = (state, {payload}) => {
    const id = payload.order.id;
    const date = payload.order.date;
    const oldOrder = state.ordersById[id];

    const newState = {
        ...state,
        ordersById: {
            ...state.ordersById,
            [id]: payload.order
        }
    };

    if (payload.order.date !== oldOrder.date) {
        newState.orderIdsByDate = new Map([
            ...state.orderIdsByDate,
            [oldOrder.date, state.orderIdsByDate.get(oldOrder.date).filter(i => i !== id)],
            [date, state.orderIdsByDate.get(date).concat(id)]
        ]);
    }

    return newState;
};

const createOrder = (state, {payload}) => {
    const id = uuidv4();

    return {
        ...state,
        ordersById: {
            ...state.ordersById,
            [id]: {...payload.order, id}
        },
        orderIdsByDate: new Map([
            ...state.orderIdsByDate,
            [payload.order.date, state.orderIdsByDate.get(payload.order.date).concat(id)]
        ])
    };
};

const deleteOrder = (state, {payload}) => {
    const order = payload.order;
    const {[order.id]: _, ...newOrdersById} = state.ordersById;
    return {
        ...state,
        ordersById: newOrdersById,
        orderIdsByDate: new Map([
            ...state.orderIdsByDate,
            [order.date, state.orderIdsByDate.get(order.date).filter(id => id !== order.id)]
        ])
    }
};

export const rootReducer = createReducer(defaultState, {
    [actionTypes.SET_ORDER_IDS]: setOrderIds,
    [actionTypes.CHANGE_ORDER]: changeOrder,
    [actionTypes.CREATE_ORDER]: createOrder,
    [actionTypes.DELETE_ORDER]: deleteOrder,
});