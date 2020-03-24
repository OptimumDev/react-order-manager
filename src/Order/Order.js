import React from "react";
import './Order.css'

export default class Order extends React.Component {
    render() {
        return (
            <textarea key={this.props.key} className='order' defaultValue={this.props.children} />
        )
    }
}