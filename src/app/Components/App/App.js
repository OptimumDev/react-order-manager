import React from 'react';
import './App.css';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import {Provider} from "react-redux";
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistedReducer} from "../../Reducers/persisted";
import Main from "../../Containers/Main";

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
