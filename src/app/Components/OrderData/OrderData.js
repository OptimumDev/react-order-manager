import React from "react";
import './OrderData.css';
import {fieldProps} from "../../Constants/OrderFieldProps";
import Calendar from "../Calendar/Calendar";
import TextareaAutosize from 'react-textarea-autosize';
import Input from "../Input/Input";

export default class OrderData extends React.Component {
    render() {
        return (
            <>
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
                {this.getComment()}
            </>
        );
    }

    getComment = () => {
        if (this.props.isEditing)
            return (
                <TextareaAutosize
                    className='comment'
                    placeholder={fieldProps.comment.name}
                    onChange={e => this.updateOrder('comment', e.target.value)}
                    defaultValue={this.props.order.comment}
                    maxRows={5}
                />
            );
        if (this.props.order.comment)
            return <div className='comment'>{this.props.order.comment}</div>
        return null
    };

    createDateRow = () => (
        <tr key='date'>
            <th>{fieldProps.date.name}</th>
            <td>
                <Calendar
                    dates={this.props.datesToCreate}
                    current={new Date(this.props.order.date)}
                    onChange={date => this.updateOrder('date', date)}
                    className='input'
                    placement='right-end'
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
        <Input
            type={fieldProps[key].type}
            value={this.props.order[key]}
            onChange={v => this.updateOrder(key, v)}
            className='input'
        />
    );

    updateOrder = (key, value) => {
        const {onUpdate, order} = this.props;

        onUpdate({...order, [key]: value});
    };
}
