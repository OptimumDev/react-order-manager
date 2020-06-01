import React from "react";
import './OrderData.css';
import {fieldNames} from "../../Constants/OrderFieldNames";

export default class OrderData extends React.Component {
    render() {
        return (
            <table className='order-data'>
                <tbody>
                {
                    Object
                        .keys(this.props.order)
                        .filter(k => fieldNames.hasOwnProperty(k))
                        .map(k => this.createRow(k))
                }
                </tbody>
            </table>
        );
    }

    createRow = key => {
        const {isEditing, order} = this.props;

        return (
            <tr key={key}>
                <th>{fieldNames[key]}</th>
                <td>
                    {isEditing ? this.createOrderInput('text', key) : order[key]}
                </td>
            </tr>
        );
    };

    createOrderInput = (type, key) => (
        <input
            type={type}
            value={this.props.order[key]}
            onChange={e => this.updateOrder(key, e.target.value)}
        />
    );

    updateOrder = (key, value) => {
        const {onUpdate, order} = this.props;

        onUpdate({...order, [key]: value});
    };
}
