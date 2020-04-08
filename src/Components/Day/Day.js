import React from "react";
import './Day.css'
import {ReactSortable} from "react-sortablejs";
import Order from '../../Containers/Order'
import DayStatistics from "../DayStatistics/DayStatistics";

export default function Day(props) {
    return (
        <div className='day'>
            <div className='date'>
                {new Date(props.dateStr)
                    .toLocaleDateString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric'})}
            </div>
            <div className='day-data'>
                <ReactSortable
                    className='orders'
                    group='orders'
                    animation={300}
                    list={props.orderIds.map(id => ({id}))}
                    setList={items => props.setOrderIds(items.map(item => item.id))}
                >
                    {props.orderIds.map(id =>
                        <Order orderId={id} key={id}/>
                    )}
                </ReactSortable>
                <DayStatistics/>
            </div>
        </div>
    );
}