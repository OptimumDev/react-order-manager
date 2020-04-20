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

    createRow = key => {
        return (
            <tr>
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
        )
    };

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