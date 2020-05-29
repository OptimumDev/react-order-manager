import {createTransform, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {rootReducer} from "./root";

const orderIdsByDateTransformer = config => createTransform(
    orderIdsByDate => JSON.stringify(Array.from(orderIdsByDate)),
    arrayString => new Map(JSON.parse(arrayString).map(([k, v]) => [new Date(k), v])),
    config,
);

const ordersByIdTransformer = config => createTransform(
    ordersById => JSON.stringify(ordersById),
    str => {
        const ordersById = JSON.parse(str);
        for (const order of Object.values(ordersById))
            order.date = new Date(order.date)
        return ordersById;
    },
    config,
);

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        orderIdsByDateTransformer({whitelist: 'orderIdsByDate'}),
        ordersByIdTransformer({whitelist: 'ordersById'})
    ],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);