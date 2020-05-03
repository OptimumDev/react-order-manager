import React from "react";
import './Order.css'
import editIcon from '../../../images/edit-24px.svg'
import doneIcon from '../../../images/done-24px.svg'
import colorsIcon from '../../../images/color_lens-24px.svg'
import deleteIcon from '../../../images/delete_forever-24px.svg'
import closeIcon from '../../../images/close-24px.svg'
import {fieldNames} from "../../Constants/OrderFieldNames";

const iconAlts = {
    editIcon: '✏️',
    doneIcon: '✔️',
    colorsIcon: '🎨',
    deleteIcon: '🗑️',
    closeIcon: '❌'
};

export default class Order extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false,
            order: props.order
        }
    }

    render() {
        return (
            <div className={`order-container` + (this.state.editing ? ' editing' : '')}>
                <div className='order-card' style={{borderColor: this.state.order.color}}>
                    <header>
                        <div className='order-icons'/>
                        <div className='order-buttons'>
                            {this.createColorButton()}
                            {this.createEditingButton(doneIcon, this.finishEditing, editIcon, this.startEditing)}
                            {this.createEditingButton(closeIcon, this.cancelEditing, deleteIcon)}
                        </div>
                    </header>
                    <table className='order-data'>
                        <tbody>
                        {
                            Object
                                .keys(this.state.order)
                                .filter(k => fieldNames.hasOwnProperty(k))
                                .map(k => this.createRow(k))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    createRow = key => (
        <tr key={key}>
            <th>{fieldNames[key]}</th>
            <td>
                {this.state.editing ? this.createOrderInput('text', key) : this.state.order[key]}
            </td>
        </tr>
    );

    createOrderInput = (type, key, tabIndex = 0) => (
        <input
            type={type}
            value={this.state.order[key]}
            onChange={e => this.updateOrder(key, e.target.value)}
            tabIndex={tabIndex}
        />
    );

    updateOrder = (key, value) => this.setState({order: {...this.state.order, [key]: value}});

    createEditingButton = (editingIcon, editingHandle, standardIcon, standardHandle) => {
        return this.state.editing
            ? this.createButton(editingIcon, editingHandle)
            : this.createButton(standardIcon, standardHandle)
    };

    createColorButton = () => {
        return this.state.editing &&
            <label className='icon-label'>
                {this.createIcon(colorsIcon)}
                {this.createOrderInput('color', 'color', -1)}
            </label>
    };

    createButton = (icon, handle) => (
        <button onClick={handle} tabIndex={-1}>
            {this.createIcon(icon)}
        </button>
    );

    createIcon = icon => (
        <img src={icon} alt={iconAlts[icon]}/>
    );

    startEditing = () => {
        this.setState({editing: true});
    };

    finishEditing = () => {
        this.setState({editing: false});
        this.props.onChange(this.state.order);
    };

    cancelEditing = () => {
        this.setState({
            editing: false,
            order: this.props.order
        });
    };
}