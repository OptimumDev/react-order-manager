import * as actionTypes from '../ActionTypes/index'


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