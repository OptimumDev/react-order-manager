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
                <CreateDialog
                    isShown={this.state.createDialogShown}
                    onClose={this.toggleCreateDialog}
                    onCreate={this.props.onCreate}
                    datesToCreate={this.props.datesToCreate}
                />
            </div>
        );
    }

    toggleCreateDialog = () => this.setState({
        createDialogShown: !this.state.createDialogShown
    });
}
