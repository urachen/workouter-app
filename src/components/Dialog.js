import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dialogComponent = props => {
  const { fullWidth, maxWidth, title, content, children, actions, openDialog } = props

  return (
    <Dialog
      fullWidth={fullWidth}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      open={openDialog}
      onClose={props.clickCloseDialog}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" >
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent>
        {children !== undefined ? children : <DialogContentText>{content}</DialogContentText>}
      </DialogContent>
      <Divider />
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  )
}
export default dialogComponent