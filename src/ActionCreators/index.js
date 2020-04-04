import * as actionTypes from '../ActionTypes/index'


export const setOrderIds = (newOrderIds, dateStr) => {
    return {
        type: actionTypes.SET_ORDER_IDS,
        payload: {
            newOrderIds,
            dateStr
        }
    }
}