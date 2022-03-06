import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
  );
}