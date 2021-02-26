import React from 'react';

import DateFnsUtils from '@date-io/date-fns';

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '-webkit-fill-available'
  },
}));

const DatetimepickerComponent = props => {
  const classes = useStyles();
  const { type, label, variant, selectValue ,helperText} = props
  // const [selectedDate, setDate] = useState(defaultValue);
  // const handleDateChange = (newDate) => {
  //   console.log(newDate);
  //   setDate(newDate);
  // }
  const picker = pickerType => {
    switch (pickerType) {
      case 'Date':
        return <DatePicker label={label} inputVariant={variant} value={selectValue} onChange={props.handleDateChange} className={classes.input} />
      case 'Time':
        return <TimePicker label={label} inputVariant={variant} value={selectValue} onChange={props.handleDateChange} helperText={helperText} className = { classes.input } />
      case 'DateTime':
      default:
return <DateTimePicker label={label} inputVariant={variant} value={selectValue} onChange={props.handleDateChange} className={classes.input} />
    }
  }
return (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    {picker(type)}
  </MuiPickersUtilsProvider>
);
}
export default DatetimepickerComponent