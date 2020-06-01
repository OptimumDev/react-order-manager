import React from "react";
import './OrderData.css';
import {fieldProps} from "../../Constants/OrderFieldProps";
import Calendar from "../Calendar/Calendar";

export default class OrderData extends React.Component {
    render() {
        return (
            <table className='order-data'>
                <tbody>
                {
                    Object
                        .keys(this.props.order)
                        .filter(k => fieldProps[k] && fieldProps[k].showAlways)
                        .map(k => this.createRow(k))
                }
                {this.props.isEditing && this.createDateRow()}
                </tbody>
            </table>
        );
    }

    createDateRow = () => (
        <tr key='date'>
            <th>{fieldProps.date.name}</th>
            <td>
                <Calendar
                    dates={this.props.datesToCreate}
                    current={new Date(this.props.order.date)}
                    onChange={date => this.updateOrder('date', date)}
                    className='input'
                />
            </td>
        </tr>
    );

    createRow = key => {
        const {isEditing, order} = this.props;

        return (
            <tr key={key}>
                <th>{fieldProps[key].name}</th>
                <td>{isEditing ? this.createInput(key) : order[key]}</td>
            </tr>
        );
    };

    createInput = key => (
        <input
            type={fieldProps[key].type}
            value={this.props.order[key]}
            onChange={e => this.updateOrder(key, e.target.value)}
            className='input'
            min={0}
        />
    );

    updateOrder = (key, value) => {
        const {onUpdate, order} = this.props;

        onUpdate({...order, [key]: value});
    };
}
