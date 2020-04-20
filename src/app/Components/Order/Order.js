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

const textOrInput = (isInput, text, onChange) => isInput
    ? <input type='text' value={text} onChange={e => onChange(e.target.value)}/>
    : text;

export default class Order extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false
        }
    }

    render() {
        let {order, onChange} = this.props;

        return (
            <div className='order-container'>
                <div className='order'>
                    <header>
                        <div className='order-icons'/>
                        <div className='order-buttons'>
                            {
                                this.state.editing &&
                                <button>
                                    <img src={colorsIcon} alt='🎨'/>
                                </button>
                            }
                            {
                                this.state.editing
                                    ? <button onClick={this.finishEditing}>
                                        <img src={doneIcon} alt='✔️'/>
                                    </button>
                                    : <button onClick={this.startEditing}>
                                        <img src={editIcon} alt='✏️'/>
                                    </button>
                            }
                            {
                                this.state.editing
                                    ? <button onClick={this.cancelEditing}>
                                        <img src={closeIcon} alt='❌'/>
                                    </button>
                                    : <button>
                                        <img src={deleteIcon} alt='🗑️'/>
                                    </button>
                            }
                        </div>
                    </header>
                    <table className='order-data'>
                        <tbody>
                        <tr>
                            <th>Номер</th>
                            <td>
                                {textOrInput(
                                    this.state.editing,
                                    order.number,
                                    number => onChange({...order, number}))}
                            </td>
                        </tr>
                        <tr>
                            <th>Объект</th>
                            <td>
                                {textOrInput(
                                    this.state.editing,
                                    order.facility,
                                    facility => onChange({...order, facility}))}
                            </td>
                        </tr>
                        <tr>
                            <th>Количество</th>
                            <td>
                                {textOrInput(
                                    this.state.editing,
                                    order.quantity,
                                    quantity => onChange({...order, quantity}))}
                            </td>
                        </tr>
                        <tr>
                            <th>Площадь</th>
                            <td>
                                {textOrInput(
                                    this.state.editing,
                                    order.area,
                                    area => onChange({...order, area}))}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

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