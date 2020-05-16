import React from "react";
import './CreateDialog.css';
import {Modal} from "@skbkontur/react-ui";
import {fieldNames} from "../../../Constants/OrderFieldNames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

export default class CreateDialog extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            orderDate: this.props.datesToCreate[0]
        };

        this.order = {
            number: '',
            facility: '',
            quantity: 0,
            area: 0,
            color: '#ffffff',
        };
    }

    render() {
        const {isShown, onClose} = this.props;

        return isShown && (
            <Modal onClose={onClose}>
                <Modal.Header>Создать новый заказ</Modal.Header>
                <Modal.Body>
                    <form id='create-form' className='order-creation-inputs' onSubmit={this.create}>
                        {this.createInput(fieldNames.number, 'number', 'text')}
                        {this.createInput(fieldNames.facility, 'facility', 'text')}
                        {this.createInput(fieldNames.quantity, 'quantity', 'number')}
                        {this.createInput(fieldNames.area, 'area', 'number')}
                        {this.createDateInput()}
                        {this.createInput('Цвет', 'color', 'color')}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className='order-creation-footer'>
                        <input
                            className='create-button'
                            type='submit'
                            form='create-form'
                            value='Создать'
                        />
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }

    create = e => {
        e.preventDefault();
        this.props.onCreate(this.order, this.state.orderDate);
        this.props.onClose();
    };

    createInput = (label, key, type) => (
        <label key={key} className='input-row'>
            <span className='input-label'>{label}</span>
            <input
                className='input'
                type={type}
                defaultValue={this.order[key]}
                onChange={e => this.order[key] = e.target.value}
                required={true}
                min={0}
            />
        </label>
    );

    createDateInput = () => (
        <label key='date' className='input-row'>
            <span className='input-label'>Дата</span>
            <DatePicker
                className='input'
                selected={this.state.orderDate}
                dateFormat='dd MMMM yyyy г.'
                locale={ru}
                includeDates={this.props.datesToCreate}
                popperPlacement={'right-start'}
                onChange={this.handleDateChange}
            />
        </label>
    );

    handleDateChange = (date, event) => {
        this.setState({orderDate: date});
        event.preventDefault();
    };
}
