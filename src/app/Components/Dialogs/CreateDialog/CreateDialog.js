import React from "react";
import './CreateDialog.css';
import {Modal, Button} from "@skbkontur/react-ui";
import Calendar from "../../Calendar/Calendar";
import {fieldProps} from "../../../Constants/OrderFieldProps";
import Input from "../../Input/Input";
import {toISODateString} from "../../../Utils/DateHelper";
import {colors, textColors} from "../../../Constants/Colors";
import ColorPicker from "../../ColorPicker/ColorPicker";

export default class CreateDialog extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.order = {
            number: '',
            facility: '',
            quantity: 0,
            area: 0,
            date: toISODateString(this.props.datesToCreate[0])
        };

        this.state = {
            color: colors[0],
            isColorPickerShown: false
        }
    }

    render() {
        const {onClose} = this.props;

        return (
            <Modal onClose={onClose}>
                <Modal.Header>Создать новый заказ</Modal.Header>
                <form onSubmit={this.create}>
                    <Modal.Body>
                        <div className='order-creation-inputs'>
                            {
                                Object
                                    .keys(this.order)
                                    .filter(k => fieldProps[k] && fieldProps[k].showAlways)
                                    .map(k => this.createInput(k))
                            }
                            {this.createDateInput()}
                            {this.createColorInput()}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='order-creation-footer'>
                            <Button use='primary' type="submit">Создать</Button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }

    create = e => {
        e.preventDefault();
        this.props.onCreate({...this.order, color: this.state.color});
        this.props.onClose();
    };

    createInput = key => (
        <label key={key} className='input-row'>
            <span className='input-label'>{fieldProps[key].name}</span>
            <Input
                className='input'
                value={this.order[key]}
                type={fieldProps[key].type}
                onChange={v => this.order[key] = v}
                required={true}
            />
        </label>
    );

    createDateInput = () => (
        <label key='date' className='input-row'>
            <span className='input-label'>{fieldProps.date.name}</span>
            <Calendar
                dates={this.props.datesToCreate}
                onChange={this.handleDateChange}
                className='input'
            />
        </label>
    );

    handleDateChange = date => this.order.date = date;

    createColorInput = () => {
        const {color, isColorPickerShown} = this.state;

        return (
            <label key='color' className='input-row color'>
                <span className='input-label'>{fieldProps.color.name}</span>
                <button
                    className='input'
                    style={{background: color, color: textColors[color]}}
                    onClick={this.toggleColorPicker}
                />
                {
                    isColorPickerShown &&
                    <ColorPicker onChange={this.changeColor} triangle='none'/>
                }
            </label>
        );
    };

    toggleColorPicker = e => {
        e && e.preventDefault();
        this.setState({isColorPickerShown: !this.state.isColorPickerShown});
    };

    changeColor = color => this.setState({color});
}
