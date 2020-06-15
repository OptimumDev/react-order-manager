import React from "react";
import './Controls.css';
import createIcon from '../../../images/note_add-black-36dp.svg';
import CreateDialog from "../Dialogs/CreateDialog/CreateDialog";
import IconButton from "../IconButton/IconButton";

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
                <IconButton onClick={this.toggleCreateDialog} icon={createIcon} alt='+' draggable={false}/>
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
