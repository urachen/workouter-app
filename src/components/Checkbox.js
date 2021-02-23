import React, { useState } from 'react';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxComponent = props => {
  const { label, checkboxList, hasError } = props;

  const [list, setList] = useState(checkboxList);

  const handleChange = (event) => {
    setList(list.map(item => {
      if (item.id !== event.target.name) return item
      return {
        ...item,
        checked: !item.checked
      }
    }))
  };
  return (
    <FormControl required error={hasError} component="fieldset">
      <FormLabel>{label}</FormLabel>
      <FormGroup>
        {list.map((c, index) => {
          return <FormControlLabel
            key={index}
            control={<Checkbox checked={c.checked} onChange={handleChange} name={c.id} />}
            label={c.label}
          />
        })}
      </FormGroup>
      <FormHelperText>You can display an error</FormHelperText>
    </FormControl>
  )
}
export default CheckboxComponent