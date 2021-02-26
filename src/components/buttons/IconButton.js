import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));

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
    default:
      return
  }
}
const ButtonComponent = props => {
  const { icon, color, ariaLabel ,className} = props;
  // const classes = useStyles();
  return (
    <IconButton aria-label={ariaLabel} color={color} onClick={props.clickButton} className={className}>
      {transferIcon(icon)}
    </IconButton>
  )

}
export default ButtonComponent;