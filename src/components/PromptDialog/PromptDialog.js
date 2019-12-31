import React from 'react';
import {
  Button, DialogActions, DialogContentText, DialogTitle, DialogContent, Dialog
} from '@material-ui/core';


import './PromptDialog.scss';

const PromptDialog = ({
  isOpen, handleClose, handleConfirm, title, content
}) => (
    /* eslint react/prop-types: 0 */
    <Dialog
      open={isOpen}
      aria-labelledby="form-dialog-title"
      className="new-project-dialog"
      onEscapeKeyDown={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
      </Button>
        <Button
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
          color="secondary"
        >
          OK
      </Button>
      </DialogActions>
    </Dialog>
  );

export default PromptDialog;
