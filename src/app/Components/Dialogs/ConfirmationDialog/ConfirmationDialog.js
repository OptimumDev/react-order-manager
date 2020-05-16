import React from "react";
import './ConfirmationDialog.css';
import {Modal, Button} from "@skbkontur/react-ui";

export default function ConfirmationDialog({isShown, onCancel, onAccept, children}) {
    return isShown && (
        <Modal noClose={true}>
            <Modal.Header>{children}</Modal.Header>
            <Modal.Footer>
                <div className='confirmation-buttons'>
                    <Button use="danger" onClick={onCancel}>Отменить</Button>
                    <Button use="success" onClick={onAccept}>Удалить</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
