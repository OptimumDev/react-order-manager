import React from "react";
import './Controls.css';
import createIcon from '../../../images/note_add-black-36dp.svg';
import CreateDialog from "../Dialogs/CreateDialog/CreateDialog";

export default class Controls extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            createDialogShown: false,
        };
    }

    render() {
        return (
            <div className='controls'>
                <button onClick={this.toggleCreateDialog}>
                    <img src={createIcon} alt='+' draggable={false}/>
                </button>
                {
                    this.state.createDialogShown &&
                    <CreateDialog
                        onClose={this.toggleCreateDialog}
                        onCreate={this.props.onOrderCreate}
                        datesToCreate={this.props.datesToCreate}
                    />
                }
            </div>
        );
    }

    toggleCreateDialog = () => this.setState({
        createDialogShown: !this.state.createDialogShown
    });
}
