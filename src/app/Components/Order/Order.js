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
            confirmationDialogShown: false
        }
    }

    render() {
        const {isEditing, order} = this.state;

        return (
            <div className={`order-container` + (isEditing ? ' editing' : '')}>
                <div className='order-card' style={{borderColor: order.color}}>
                    <header>
                        {/* ↓ для пометки "Важное" и тп */}
                        <div className='order-icons'/>
                        <OrderButtons
                            order={order}
                            isEditing={isEditing}
                            onStartEditing={this.startEditing}
                            onFinishEditing={this.finishEditing}
                            onCancelEditing={this.cancelEditing}
                            onDelete={this.toggleDialog}
                        />
                    </header>
                    <OrderData order={order} isEditing={isEditing} onUpdate={this.updateOrder}/>
                    {
                        this.state.confirmationDialogShown &&
                        <ConfirmationDialog onCancel={this.toggleDialog} onAccept={this.delete}>
                            Удалить заказ {this.state.order.number}?
                        </ConfirmationDialog>
                    }
                </div>
            </div>
        );
    }

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

    toggleDialog = () => this.setState({
        confirmationDialogShown: !this.state.confirmationDialogShown
    });

    delete = () => {
        this.props.onDelete(this.state.order);
    };
}