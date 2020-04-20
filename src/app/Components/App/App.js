import React from 'react';
import './App.css';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import {Provider} from "react-redux";
import {rootReducer} from "../../Reducers";
import Days from "../../Containers/Days";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/lib/integration/react';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);


function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="App">
                    <Days />
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;