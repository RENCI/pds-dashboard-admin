import React from "react";
import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";

const ConfirmRemoveDialog = ({ open, onConfirm, onClose }) => {  
  return (
    <Dialog
      open={ open }
      onClose={ onClose }
    >
      <DialogContent>
        <DialogContentText>
          Remove selector rule?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          color="primary" 
          onClick={ onConfirm }
        >
          Confirm
        </Button>
        <Button
          color="primary" 
          onClick={ onClose }
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmRemoveDialog;