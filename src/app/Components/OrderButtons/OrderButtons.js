import React from "react";
import './OrderButtons.css';

import {TwitterPicker} from 'react-color';
import {colors} from "../../Constants/Colors"

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
    constructor(props, context) {
        super(props, context);
        this.state = {
            isColorPickerShown: false
        };
    }

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
        return (
            <span className='color-picker'>
                {this.createButton(colorsIcon, this.toggleColorPicker)}
                {
                    this.state.isColorPickerShown &&
                    <div className='color-picker-container'>
                        <TwitterPicker
                            colors={colors}
                            triangle={'top-right'}
                            width={168}
                            onChangeComplete={this.changeColor}
                        />
                    </div>
                }
            </span>
        );
    };

    createButton = (icon, handle) => (
        <button onClick={handle} tabIndex={-1}>
            <img src={icon} alt={iconAlts[icon]}/>
        </button>
    );

    toggleColorPicker = () => this.setState({isColorPickerShown: !this.state.isColorPickerShown});

    changeColor = color => {
        this.toggleColorPicker();
        this.props.onColorChange(color.hex);
    }
}
