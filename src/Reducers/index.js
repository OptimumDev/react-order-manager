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
            text: '123 123\ntest'
        },
        [id2]: {
            text: 'for more tests'
        },
        [id3]: {
            text: 'second day starts'
        },
        [id4]: {
            text: 'the last one'
        }
    },
    orderIdsByDate: {
        '2020-04-01': [ id1, id2 ],
        '2019-12-31': [ id3, id4 ],
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

export const rootReducer = createReducer(defaultState, {
    [actionTypes.SET_ORDER_IDS]: setOrderIds
});