import * as actionTypes from '../Constants/ActionTypes'


export const setOrderIds = (orderIds, date) => ({
    type: actionTypes.SET_ORDER_IDS,
    payload: {
        orderIds,
        date
    }
});

export const changeOrder = order => ({
    type: actionTypes.CHANGE_ORDER,
    payload: {
        order
    }
});

export const createOrder = order => ({
    type: actionTypes.CREATE_ORDER,
    payload: {
        order
    }
});

export const deleteOrder = order => ({
    type: actionTypes.DELETE_ORDER,
    payload: {
        order
    }
});

export const updateDays = () => ({
    type: actionTypes.UPDATE_DAYS,
    payload: {}
});
