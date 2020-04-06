import React from "react";
import './Order.css'

export default function Order({orderId, order, onChange}) {
    console.log(orderId);
    return (
        <textarea
            key={orderId}
            className='order'
            value={order.text}
            onChange={e => onChange({...order, text: e.target.value})}
        />
    );
}