import * as actionTypes from '../Constants/ActionTypes'


export const setOrderIds = (orderIds, date) => ({
    type: actionTypes.SET_ORDER_IDS,
    payload: {
        orderIds,
        date
    }
});

export const setDoneOrderIds = (orderIds, date) => ({
    type: actionTypes.SET_DONE_ORDER_IDS,
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

export const markOrderDone = order => ({
    type: actionTypes.MARK_ORDER_DONE,
    payload: {
        order
    }
});

export const restoreOrder = order => ({
    type: actionTypes.RESTORE_ORDER,
    payload: {
        order
    }
});
