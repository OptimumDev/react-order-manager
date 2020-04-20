import React from "react";
import './Order.css'
import editIcon from '../../../images/edit-24px.svg'
import doneIcon from '../../../images/done-24px.svg'
import colorsIcon from '../../../images/color_lens-24px.svg'
import deleteIcon from '../../../images/delete_forever-24px.svg'
import closeIcon from '../../../images/close-24px.svg'

const fieldNames = {
    number: 'Номер',
    facility: 'Объект',
    quantity: 'Колличество',
    area: 'Площадь'
};

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
            editing: false
        }
    }

    render() {
        return (
            <div className='order-container'>
                <div className='order'>
                    <header>
                        <div className='order-icons'/>
                        <div className='order-buttons'>
                            {this.state.editing && this.createButton(colorsIcon)}
                            {this.createEditingButton(doneIcon, this.finishEditing, editIcon, this.startEditing)}
                            {this.createEditingButton(closeIcon, this.cancelEditing, deleteIcon)}
                        </div>
                    </header>
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
                </div>
            </div>
        );
    }

    createRow = key => (
        <tr key={key}>
            <th>{fieldNames[key]}</th>
            <td>
                {
                    this.state.editing
                        ? <input
                            type='text'
                            value={this.props.order[key]}
                            onChange={e => this.props.onChange({...this.props.order, [key]: e.target.value})}/>
                        : this.props.order[key]
                }
            </td>
        </tr>
    );

    createEditingButton = (editingIcon, editingHandle, standardIcon, standardHandle) => {
        return this.state.editing
            ? this.createButton(editingIcon, editingHandle)
            : this.createButton(standardIcon, standardHandle)
    };

    createButton = (icon, handle) => (
        <button onClick={handle}>
            <img src={icon} alt={iconAlts[icon]}/>
        </button>
    );

    startEditing = () => {
        this.setState({editing: true});
    };

    finishEditing = () => {
        this.setState({editing: false});
    };

    cancelEditing = () => {
        this.setState({editing: false});
    };
}