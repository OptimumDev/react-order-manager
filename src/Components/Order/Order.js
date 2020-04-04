import React from "react";
import './Order.css'

export default function Order(props) {
    return (
        <textarea key={props.orderId} className='order' value={props.order.text}/>
    );
}