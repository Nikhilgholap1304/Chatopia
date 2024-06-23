import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";

const DialogBox = ({ dialogOpen, setDialogOpen, handleDeleteChat }) => {
  const handleClose = () => {
    setDialogOpen(false);
  };
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Chat"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By deleting this chat you will loose all the data related to it and can't be reverted back. Are you sure ? 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{color:'#ff9886'}}>Disagree</Button>
            <Button onClick={handleClose} variant="contained" color="error" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default DialogBox;
