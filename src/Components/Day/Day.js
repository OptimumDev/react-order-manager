import React from "react";
import './Day.css'
import {ReactSortable} from "react-sortablejs";
import DateIcon from "../DateIcon/DateIcon";
import Order from '../../Containers/Order'

export default function Day(props) {
    return (
        <div className='day' key={props.dateStr}>
            <DateIcon date={new Date(props.dateStr)}/>
            <ReactSortable
                className='orders'
                group='orders'
                animation={300}
                list={props.orderIds.map(id => ({id}))}
                setList={items => props.setOrderIds(items.map(item => item.id))}
            >
                {props.orderIds.map(id =>
                    <Order orderId={id}/>
                )}
            </ReactSortable>
        </div>
    );
}