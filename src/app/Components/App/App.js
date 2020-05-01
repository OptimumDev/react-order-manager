import React from 'react';
import './App.css';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import {Provider} from "react-redux";
import {rootReducer} from "../../Reducers";
import Days from "../../Containers/Days";
import Controls from "../Controls/Controls";

import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/lib/integration/react';

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
                <div className="app">
                    <header className='app-header'>
                        <span className='app-name'>Order Manager</span>
                        <Controls/>
                    </header>
                    <Days/>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
