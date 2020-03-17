import React from "react";
import './Order.css'

export default class Order extends React.Component {
    render() {
        return (
            <textarea className='order'>
                {this.props.children}
            </textarea>
        )
    }
}