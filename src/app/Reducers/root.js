import * as actionTypes from '../Constants/ActionTypes';
import {createReducer} from 'redux-create-reducer';
import {v4 as uuidv4} from "uuid";
import {orderBy, partition} from "../Utils/arrayHelper";
import {toISODateString} from "../Utils/DateHelper";

const today = new Date();
const todayStr = toISODateString(today);

export const defaultState = {
    ordersById: {},
    orderIdsByDate: {
        [todayStr]: [],
    },
    doneOrderIdsByDate: {}
};

const setOrderIds = (state, {payload}) => ({
    ...state,
    ordersById: payload.orderIds.reduce((acc, id) => {
        acc[id] = {...acc[id], date: payload.date};
        return acc;
    }, {...state.ordersById}),
    orderIdsByDate: {
        ...state.orderIdsByDate,
        [payload.date]: payload.orderIds
    }
});

const setDoneOrderIds = (state, {payload}) => ({
    ...state,
    doneOrderIdsByDate: {
        ...state.doneOrderIdsByDate,
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
            newState.ordersById[id].date = toISODateString(first.date);
        first.ids.push(...ids);
    }
};

const addNewDays = current => {
    const first = current[0]

    for (let i = current.length; i < DAYS_COUNT; i++) {
        const date = new Date(first.date);
        date.setDate(date.getDate() + i);
        current.push({date, ids: []});
    }
};

const updateDays = state => {
    const now = new Date(toISODateString(new Date()));
    const newState = {...state};

    const orderedDates = orderDays(state.orderIdsByDate);
    const [passed, current] = partition(orderedDates, x => x.date < now);
    shiftDays(passed, current, newState);
    addNewDays(current);

    newState.orderIdsByDate = current.reduce((acc, {date, ids}) => {
        acc[toISODateString(date)] = ids;
        return acc;
    }, {});

    return newState;
};

const markOrderDone = (state, {payload}) => {
    const {order} = payload;

    return {
        ...state,
        ordersById: {
            ...state.ordersById,
            [order.id]: {...order, isDone: true}
        },
        orderIdsByDate: {
            ...state.orderIdsByDate,
            [order.date]: state.orderIdsByDate[order.date].filter(id => id !== order.id)
        },
        doneOrderIdsByDate: {
            ...state.doneOrderIdsByDate,
            [order.date]: state.doneOrderIdsByDate[order.date]
                ? state.doneOrderIdsByDate[order.date].concat(order.id)
                : [order.id]
        }
    };
};

const restoreOrder = (state, {payload}) => {
    const {order} = payload;
    const restoreDate = toISODateString(new Date());

    const newState = {
        ...state,
        ordersById: {
            ...state.ordersById,
            [order.id]: {...order, date: restoreDate, isDone: false}
        },
        orderIdsByDate: {
            ...state.orderIdsByDate,
            [restoreDate]: state.orderIdsByDate[restoreDate]
                ? state.orderIdsByDate[restoreDate].concat(order.id)
                : [order.id]
        },
        doneOrderIdsByDate: {
            ...state.doneOrderIdsByDate,
            [order.date]: state.doneOrderIdsByDate[order.date].filter(id => id !== order.id)
        }
    };

    const {[order.date]: ids, ...doneOrderIdsByDate} = newState.doneOrderIdsByDate;
    if (ids.length === 0)
        newState.doneOrderIdsByDate = doneOrderIdsByDate;

    return newState;
};

export const rootReducer = createReducer(defaultState, {
    [actionTypes.SET_ORDER_IDS]: setOrderIds,
    [actionTypes.SET_DONE_ORDER_IDS]: setDoneOrderIds,
    [actionTypes.CHANGE_ORDER]: changeOrder,
    [actionTypes.CREATE_ORDER]: createOrder,
    [actionTypes.DELETE_ORDER]: deleteOrder,
    [actionTypes.UPDATE_DAYS]: updateDays,
    [actionTypes.MARK_ORDER_DONE]: markOrderDone,
    [actionTypes.RESTORE_ORDER]: restoreOrder,
});