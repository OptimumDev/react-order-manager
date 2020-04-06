import * as actionTypes from '../ActionTypes';
import {createReducer} from 'redux-create-reducer';
import {v4 as uuidv4} from "uuid";

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();

export const defaultState = {
    ordersById: {
        [id1]: {
            text: '123 123\ntest',
            number: '1234.5',
            facility: 'Объект 1',
            quantity: 123,
            area: 100,
        },
        [id2]: {
            text: 'for more tests',
            number: '3456',
            facility: 'Объект 2',
            quantity: 300,
            area: 500,
        },
        [id3]: {
            text: 'second day starts',
            number: '789',
            facility: 'Объект 3',
            quantity: 467,
            area: 425,
        },
        [id4]: {
            text: 'the last one',
            number: '6754.1',
            facility: 'Объект 4',
            quantity: 10,
            area: 23,
        }
    },
    orderIdsByDate: {
        '2020-04-01': [id1, id2],
        '2019-12-31': [id3, id4],
    },
};

function setOrderIds(state, {payload}) {
    return {
        ...state,
        orderIdsByDate: {
            ...state.orderIdsByDate,
            [payload.dateStr]: payload.newOrderIds
        }
    }
}

function changeOrder(state, {payload}) {
    return {
        ...state,
        ordersById: {
            ...state.ordersById,
            [payload.orderId]: payload.newOrder
        }
    }
}

export const rootReducer = createReducer(defaultState, {
    [actionTypes.SET_ORDER_IDS]: setOrderIds,
    [actionTypes.CHANGE_ORDER]: changeOrder,
});