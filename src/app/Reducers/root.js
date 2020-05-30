import * as actionTypes from '../Constants/ActionTypes';
import {createReducer} from 'redux-create-reducer';
import {v4 as uuidv4} from "uuid";
import {orderBy, partition} from "../Utils/arrayHelper";

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
            date: today.toString()
        },
        [id2]: {
            id: id2,
            number: '3456',
            facility: 'Объект 2',
            quantity: 300,
            area: 500,
            color: '#00ff00',
            date: today.toString()
        },
        [id3]: {
            id: id3,
            number: '789',
            facility: 'Объект 3',
            quantity: 467,
            area: 425,
            color: '#0000ff',
            date: tomorrow.toString()
        },
        [id4]: {
            id: id4,
            number: '6754.1',
            facility: 'Объект 4',
            quantity: 10,
            area: 23,
            color: '#ffff00',
            date: tomorrow.toString()
        }
    },
    orderIdsByDate: {
        [today]: [id1, id2],
        [tomorrow]: [id3, id4]
    }
};

const setOrderIds = (state, {payload}) => ({
    ...state,
    orderIdsByDate: {
        ...state.orderIdsByDate,
        [payload.date]: payload.orderIds
    }
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
        newState.orderIdsByDate = {
            ...state.orderIdsByDate,
            [oldOrder.date]: state.orderIdsByDate[oldOrder.date].filter(i => i !== id),
            [date]: state.orderIdsByDate[date].concat(id)
        };
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
        orderIdsByDate: {
            ...state.orderIdsByDate,
            [payload.order.date]: state.orderIdsByDate[payload.order.date].concat(id)
        }
    };
};

const deleteOrder = (state, {payload}) => {
    const order = payload.order;
    const {[order.id]: _, ...newOrdersById} = state.ordersById;
    return {
        ...state,
        ordersById: newOrdersById,
        orderIdsByDate: {
            ...state.orderIdsByDate,
            [order.date]: state.orderIdsByDate[order.date].filter(id => id !== order.id)
        }
    }
};

const DAYS_COUNT = 7 * 4;

const orderDays = orderIdsByDate => {
    const toOrder = Object
        .entries(orderIdsByDate)
        .map(([date, ids]) => ({date: new Date(date), ids}));

    return orderBy(toOrder, x => x.date);
};

const shiftDays = (passed, current, newState) => {
    const first = current[0]

    for (const {ids} of passed) {
        for (const id of ids)
            newState.ordersById[id].date = first.date.toString();
        first.ids.push(...ids);
    }
};

const addNewDays = current => {
    const first = current[0]

    for (let i = current.length; i < DAYS_COUNT; i++) {
        const date = new Date(first.date);
        date.setDate(date.getDate() + i);
        current.push({date,  ids: []});
    }
};

const updateDays = state => {
    const now = new Date();
    const newState = {...state};

    const orderedDates = orderDays(state.orderIdsByDate);
    const [passed, current] = partition(orderedDates, x => x.date < now);
    shiftDays(passed, current, newState);
    addNewDays(current);

    newState.orderIdsByDate = current.reduce((acc, {date, ids}) => {
        acc[date] = ids;
        return acc;
    }, {});

    return newState;
};

export const rootReducer = createReducer(defaultState, {
    [actionTypes.SET_ORDER_IDS]: setOrderIds,
    [actionTypes.CHANGE_ORDER]: changeOrder,
    [actionTypes.CREATE_ORDER]: createOrder,
    [actionTypes.DELETE_ORDER]: deleteOrder,
    [actionTypes.UPDATE_DAYS]: updateDays,
});