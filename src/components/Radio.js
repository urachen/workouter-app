import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const RadioComponent = props => {
  const { label, radioList, horizontal ,helperText ,hasError} = props;
  const [value, setValue] = React.useState([0]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl component="fieldset" error={hasError} >
      <FormLabel>{label}</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}
        row={horizontal}>
        {radioList.map((r, index) => {
          return <FormControlLabel key={index} value={r.value} control={<Radio />} label={r.label} />
        })}
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
export default RadioComponent