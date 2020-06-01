import React from "react";
import './OrderData.css';
import {fieldProps} from "../../Constants/OrderFieldProps";

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
                </tbody>
            </table>
        );
    }

    createRow = key => {
        const {isEditing, order} = this.props;

        return (
            <tr key={key}>
                <th>{fieldProps[key].name}</th>
                <td>{isEditing ? this.createOrderInput(key) : order[key]}</td>
            </tr>
        );
    };

    createOrderInput = key => (
        <input
            type={fieldProps[key].type}
            value={this.props.order[key]}
            onChange={e => this.updateOrder(key, e.target.value)}
            min={0}
        />
    );

    updateOrder = (key, value) => {
        const {onUpdate, order} = this.props;

        onUpdate({...order, [key]: value});
    };
}
