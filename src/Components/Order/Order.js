import React, {useState} from "react";
import './Order.css'

const textOrInput = (isInput, text, onChange) => isInput
    ? <input type='text' value={text} onChange={e => onChange(e.target.value)}/>
    : text;

export default function Order({order, onChange}) {
    const [editing, setEditing] = useState(false);

    return (
        <div className='order-container'>
            <div className='order'>
                <header>
                    <div className='order-icons'/>
                    <div className='order-buttons'>
                        <button onClick={() => setEditing(p => !p)}>{editing ? "✔️" : "✏️"}</button>
                        <button>🎨</button>
                        <button>🗑️</button>
                    </div>
                </header>
                <table className='order-data'>
                    <tbody>
                    <tr>
                        <th>Номер</th>
                        <td>
                            {textOrInput(
                                editing,
                                order.number,
                                number => onChange({...order, number}))}
                        </td>
                    </tr>
                    <tr>
                        <th>Объект</th>
                        <td>
                            {textOrInput(
                                editing,
                                order.facility,
                                facility => onChange({...order, facility}))}
                        </td>
                    </tr>
                    <tr>
                        <th>Количество</th>
                        <td>
                            {textOrInput(
                                editing,
                                order.quantity,
                                quantity => onChange({...order, quantity}))}
                        </td>
                    </tr>
                    <tr>
                        <th>Площадь</th>
                        <td>
                            {textOrInput(
                                editing,
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