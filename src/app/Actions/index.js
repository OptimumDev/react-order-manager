import * as actionTypes from '../Constants/ActionTypes'


export const setOrderIds = (newOrderIds, dateStr) => {
    return {
        type: actionTypes.SET_ORDER_IDS,
        payload: {
            newOrderIds,
            dateStr
        }
    }
};

export const changeOrder = newOrder => {
    return {
        type: actionTypes.CHANGE_ORDER,
        payload: {
            orderId: newOrder.id,
            newOrder
        }
    }
};

export const createOrder = (order, dateStr) => {
    return {
        type: actionTypes.CREATE_ORDER,
        payload: {
            dateStr,
            order
        }
    }
};