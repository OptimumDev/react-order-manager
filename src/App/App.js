import React from 'react';
import logo from '../logo.svg';
import './App.css';
import DateComponent from '../DateComponent/DateComponent'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1>
                    Under construction
                </h1>
                <DateComponent date={new Date()}/>
            </header>
        </div>
    );
}

export default App;
