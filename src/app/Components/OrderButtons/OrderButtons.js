import React from "react";
import './OrderButtons.css';

import saveIcon from "../../../images/done-24px.svg";
import editIcon from "../../../images/edit-24px.svg";
import cancelIcon from "../../../images/close-24px.svg";
import deleteIcon from "../../../images/delete_forever-24px.svg";
import colorsIcon from "../../../images/color_lens-24px.svg";
import doneIcon from "../../../images/check_box-24px.svg";

const iconAlts = {
    editIcon: '✏️',
    saveIcon: '✔️',
    colorsIcon: '🎨',
    deleteIcon: '🗑️',
    cancelIcon: '❌',
    doneIcon: '☑️'
};

export default class OrderButtons extends React.Component {
    render() {
        return (
            <div className='order-buttons'>
                {this.props.isEditing ? this.getEditingButtons() : this.getStandardButtons()}
            </div>
        );
    }

    getEditingButtons = () => (
        <>
            {this.createButton(deleteIcon, this.props.onDelete)}
            {this.createColorButton()}
            {this.createButton(saveIcon, this.props.onFinishEditing)}
            {this.createButton(cancelIcon, this.props.onCancelEditing)}
        </>
    )

    getStandardButtons = () => (
        <>
            {this.createButton(editIcon, this.props.onStartEditing)}
            {this.createButton(doneIcon)}
        </>
    );

    createColorButton = () => {
        const {order, onUpdate} = this.props;

        return (
            <label className='icon-label'>
                {this.createIcon(colorsIcon)}
                <input
                    type='color'
                    value={order.color}
                    onChange={e => onUpdate({...order, color: e.target.value})}
                    tabIndex={-1}
                />
            </label>
        );
    };

    createButton = (icon, handle) => (
        <button onClick={handle} tabIndex={-1}>
            {this.createIcon(icon)}
        </button>
    );

    createIcon = icon => (
        <img src={icon} alt={iconAlts[icon]}/>
    );
}
