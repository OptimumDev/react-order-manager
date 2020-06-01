import React from "react";
import './Calendar.css';
import ru from "date-fns/locale/ru";
import DatePicker from "react-datepicker";

export default class Calendar extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            date: this.props.dates[0]
        };
    }

    render() {
        const {dates, className = ''} = this.props;
        return (
            <DatePicker
                className={className}
                selected={this.state.date}
                dateFormat='d MMMM'
                locale={ru}
                includeDates={dates}
                popperPlacement={'right-start'}
                onChange={this.handleDateChange}
            />
        );
    }

    handleDateChange = (date, event) => {
        event.preventDefault();
        this.setState({date});
        this.props.onChange(date.toString());
    };
}
