import React from "react";
import './OrderButtons.css';

import ColorPicker from "../ColorPicker/ColorPicker";
import IconButton from "../IconButton/IconButton";

import saveIcon from "../../../images/done-24px.svg";
import editIcon from "../../../images/edit-24px.svg";
import cancelIcon from "../../../images/close-24px.svg";
import deleteIcon from "../../../images/delete_forever-24px.svg";
import colorsIcon from "../../../images/color_lens-24px.svg";
import doneIcon from "../../../images/check_box-24px.svg";
import restoreIcon from "../../../images/reply-24px.svg";

const iconAlts = {
    editIcon: '✏️',
    saveIcon: '✔️',
    colorsIcon: '🎨',
    deleteIcon: '🗑️',
    cancelIcon: '❌',
    doneIcon: '☑️',
    restoreIcon: '↩️'
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
                {this.getButtons()}
            </div>
        );
    }

    getButtons = () => {
        if (this.props.isDone)
            return this.getRestoreButtons();
        if (this.props.isEditing)
            return this.getEditingButtons();
        return this.getStandardButtons();
    }

    getEditingButtons = () => (
        <>
            {this.createButton(deleteIcon, this.props.onDelete)}
            {this.createColorButton()}
            {this.createButton(saveIcon, this.props.onFinishEditing)}
            {this.createButton(cancelIcon, this.props.onCancelEditing)}
        </>
    );

    getStandardButtons = () => (
        <>
            {this.createButton(editIcon, this.props.onStartEditing)}
            {this.createButton(doneIcon, this.props.onDone)}
        </>
    );

    getRestoreButtons = () => (
        <>
            {this.createButton(restoreIcon, this.props.onRestore)}
        </>
    );

    createColorButton = () => (
        <span className='color-picker'>
            {this.createButton(colorsIcon, this.toggleColorPicker)}
            {
                this.state.isColorPickerShown &&
                <ColorPicker onChange={this.changeColor}/>
            }
        </span>
    );

    createButton = (icon, handle) => (
        <IconButton
            onClick={handle}
            icon={icon}
            alt={iconAlts[icon]}
            className={'order-button'}
            tabIndex={-1}
        />
    );

    toggleColorPicker = () => this.setState({isColorPickerShown: !this.state.isColorPickerShown});

    changeColor = color => {
        this.toggleColorPicker();
        this.props.onColorChange(color);
    }
}
