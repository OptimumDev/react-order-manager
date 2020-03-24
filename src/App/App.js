import React from 'react';
import './App.css';
import Day from "../Day/Day";

let id = 0;
const orders = [
    {
        text: '123 123\ntest'
    },
    {
        text: 'for more tests'
    }
];

function App() {
    return (
        <div className="App">
            <Day date={new Date()} orders={orders.map(o => ({...o, id: id++}))}/>
            <Day date={new Date('2019-12-31')} orders={orders.map(o => ({...o, id: id++}))}/>
        </div>
    );
}

export default App;
