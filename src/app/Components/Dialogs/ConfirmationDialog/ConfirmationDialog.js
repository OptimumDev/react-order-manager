import React from "react";
import './ConfirmationDialog.css';
import {Modal, Button} from "@skbkontur/react-ui";

export default function ConfirmationDialog({acceptValue, onCancel, onAccept, use = 'primary', children}) {
    return (
        <Modal noClose={true}>
            <Modal.Header>{children}</Modal.Header>
            <Modal.Footer>
                <div className='confirmation-buttons'>
                    <Button onClick={onCancel}>Отменить</Button>
                    <Button use={use} onClick={onAccept}>{acceptValue}</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
