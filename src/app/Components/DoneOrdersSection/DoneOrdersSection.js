import React from "react";
import './DoneOrdersSection.css';
import Days from "../Days/Days";
import IconButton from "../IconButton/IconButton";

import expandIcon from '../../../images/expand_more-24px.svg'
import hideIcon from '../../../images/expand_less-24px.svg'

export default class DoneOrdersSection extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isExpanded: !this.props.isExpandable
        };
    }

    render() {
        const {
            doneOrderIdsByDate, ordersById, setOrders, onOrderRestore,
            isExpandable, skipCount = 0, showCount, children
        } = this.props;
        const {isExpanded} = this.state;

        return (
            <div className='done-orders-section'>
                <header className='done-orders-header'>
                    <div>{children}</div>
                    {
                        isExpandable &&
                        <IconButton
                            onClick={this.toggleExpanded}
                            icon={isExpanded ? hideIcon : expandIcon}
                            alt={isExpanded ? '▲' : '▼'}
                            className='expand-button'
                        />
                    }
                </header>
                <div className='done-orders-body'>
                    {
                        isExpanded
                            ? <Days
                                orderIdsByDate={doneOrderIdsByDate}
                                ordersById={ordersById}
                                setOrders={setOrders}
                                onOrderRestore={onOrderRestore}
                                byDescending={true}
                                disableDragging={true}
                                skipCount={skipCount}
                                showCount={showCount}
                            />
                            : 'Stats'
                    }
                </div>

            </div>
        );
    }

    toggleExpanded = () => this.setState({isExpanded: !this.state.isExpanded});
}
