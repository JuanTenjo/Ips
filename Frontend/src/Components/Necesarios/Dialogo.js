import React from 'react';

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialogo = ({handleDialog,InfoDialog}) => {


  const handleClose = () => {
    handleDialog();
  };

  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{margin:'0'}} id="alert-dialog-slide-title">
          Control de operaciones
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Desea ${InfoDialog.operacion} esta ${InfoDialog.tipo}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  size="small">
            Cancelar
          </Button>
          <Button onClick={() => InfoDialog.funcion(InfoDialog.ID)}   size="small" color="primary">
            {InfoDialog.operacion}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dialogo;
