import React from "react";
import './ConfirmationDialog.css';
import {Modal, Button} from "@skbkontur/react-ui";

export default function ConfirmationDialog({acceptValue, onCancel, onAccept, children}) {
    return (
        <Modal noClose={true}>
            <Modal.Header>{children}</Modal.Header>
            <Modal.Footer>
                <div className='confirmation-buttons'>
                    <Button use="primary" onClick={onCancel}>Отменить</Button>
                    <Button onClick={onAccept}>{acceptValue}</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
