import React from "react";
import './Order.css'
import ConfirmationDialog from "../Dialogs/ConfirmationDialog/ConfirmationDialog";
import OrderData from "../OrderData/OrderData";
import OrderButtons from "../OrderButtons/OrderButtons";

export default class Order extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEditing: false,
            order: props.order,
            deleteDialogShown: false,
            doneDialogShown: false,
            restoreDialogShown: false,
        }
    }

    render() {
        const {isEditing, order, deleteDialogShown, doneDialogShown, restoreDialogShown} = this.state;

        return (
            <div className={`order-container` + (isEditing ? ' editing' : '')}>
                <div className='order-card' style={{borderColor: order.color}}>
                    <header>
                        {/* ↓ для пометки "Важное" и тп */}
                        <div className='order-icons'/>
                        <OrderButtons
                            isEditing={isEditing}
                            isDone={order.isDone}
                            onStartEditing={this.startEditing}
                            onFinishEditing={this.finishEditing}
                            onCancelEditing={this.cancelEditing}
                            onDelete={this.toggleDeleteDialog}
                            onColorChange={this.changeColor}
                            onDone={this.toggleDoneDialog}
                            onRestore={this.toggleRestoreDialog}
                        />
                    </header>
                    <OrderData
                        order={order}
                        isEditing={isEditing}
                        datesToCreate={this.props.datesToCreate}
                        onUpdate={this.updateOrder}
                    />
                    {this.getDialog(deleteDialogShown, 'Удалить', this.delete, this.toggleDeleteDialog)}
                    {this.getDialog(doneDialogShown, 'Завершить', this.markDone, this.toggleDoneDialog)}
                    {this.getDialog(restoreDialogShown, 'Восстановить', this.restore, this.toggleRestoreDialog)}
                </div>
            </div>
        );
    }

    getDialog = (isShown, verb, onAccept, onCancel) => (
        isShown &&
        <ConfirmationDialog acceptValue={verb} onAccept={onAccept} onCancel={onCancel}>
            {verb} заказ {this.props.order.number}?
        </ConfirmationDialog>
    );

    updateOrder = order => this.setState({order});

    startEditing = () => {
        this.setState({isEditing: true});
    };

    finishEditing = () => {
        this.setState({isEditing: false});
        this.props.onChange(this.state.order);
    };

    cancelEditing = () => {
        this.setState({
            isEditing: false,
            order: this.props.order
        });
    };

    toggleDeleteDialog = () => this.setState({
        deleteDialogShown: !this.state.deleteDialogShown
    });

    toggleDoneDialog = () => this.setState({
        doneDialogShown: !this.state.doneDialogShown
    });

    toggleRestoreDialog = () => this.setState({
        restoreDialogShown: !this.state.restoreDialogShown
    });

    delete = () => {
        this.props.onDelete(this.state.order);
    };

    changeColor = color => this.updateOrder({...this.state.order, color});

    markDone = () => {
        this.props.onDone(this.state.order);
    }

    restore = () => {
        this.props.onRestore(this.state.order);
    }
}