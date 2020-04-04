import React from 'react';
import './App.css';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import {Provider} from "react-redux";
import {rootReducer} from "../../Reducers";
import Days from "../../Containers/Days";

const store = createStore(rootReducer, applyMiddleware(logger));

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Days />
            </div>
        </Provider>
    );
}

export default App;
