import React, {useState} from "react";
import './Controls.css';
import {Modal} from "@skbkontur/react-ui";
import createIcon from '../../../images/note_add-black-36dp.svg';

export default function Controls({onCreate}) {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const toggleCreateModal = () => setCreateModalVisible(p => !p);
    return (
        <div className='controls'>
            <button onClick={toggleCreateModal}>
                <img src={createIcon} alt='+' draggable={false}/>
            </button>
            {
                createModalVisible &&
                <Modal onClose={toggleCreateModal}>
                    <Modal.Header>Создать новый заказ</Modal.Header>
                    <Modal.Body>
                        Здесь будет куча инпутов
                    </Modal.Body>
                    <Modal.Footer>
                        <button>Создать</button>
                    </Modal.Footer>
                </Modal>
            }
        </div>
    );
}
