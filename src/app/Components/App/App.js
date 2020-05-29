import React from 'react';
import './App.css';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import {Provider} from "react-redux";
import {rootReducer} from "../../Reducers";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/lib/integration/react';
import Main from "../../Containers/Main";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);


export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Main/>
            </PersistGate>
        </Provider>
    );
}
