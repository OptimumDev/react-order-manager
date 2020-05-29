import * as actionTypes from '../Constants/ActionTypes'


export const setOrderIds = (orderIds, date) => {
    return {
        type: actionTypes.SET_ORDER_IDS,
        payload: {
            orderIds,
            date
        }
    }
};

export const changeOrder = order => {
    return {
        type: actionTypes.CHANGE_ORDER,
        payload: {
            order
        }
    }
};

export const createOrder = (order) => {
    return {
        type: actionTypes.CREATE_ORDER,
        payload: {
            order
        }
    }
};

export const deleteOrder = order => {
    return {
        type: actionTypes.DELETE_ORDER,
        payload: {
            order
        }
    }
};
