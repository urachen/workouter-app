import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const transferIcon = type => {
  switch (type) {
    case 'SaveIcon':
      return <SaveIcon />
    case 'DeleteIcon':
      return <DeleteIcon />
    case 'AddIcon':
      return <AddIcon />
    case 'EditIcon':
      return <EditIcon />
    case 'ClearIcon':
      return <ClearIcon />
    case 'KeyboardBackspaceIcon':
      return <KeyboardBackspaceIcon />
    default:
      return
  }
}

const ButtonComponent = props => {
  const classes = useStyles();
  const { text, variant, color, disabled, size, startIcon, defaultMargin, fullWidth } = props;

  return (
    <Button variant={variant}
      color={color}
      disabled={disabled}
      size={size}
      className={defaultMargin !== undefined ? '' : classes.margin}
      startIcon={transferIcon(startIcon)}
      onClick={props.clickButton}
      fullWidth={fullWidth !== undefined ? fullWidth : false}
    >{text}</Button>
  )
}
ButtonComponent.defaultProps = {}

export default ButtonComponent;