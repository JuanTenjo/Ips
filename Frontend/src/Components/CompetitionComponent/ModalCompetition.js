import React, { useState, useEffect } from "react";
import UserForm from "../../Hooks/useForm";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import API from "../../Utils/dominioBackend";

import {
  makeStyles,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";

const useStyle = makeStyles((theme) => ({
  botonStrategy: {
    marginTop: theme.spacing(1),
    backgroundColor: "#42B83A",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#3D8838",
    },
  },
  textFields: {
    width: "16%",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  select: {
    marginTop: theme.spacing(1),
  },
  displayInput: {
    display: "none",
  },
}));

const initialForm = {
  idEstrategia: "",
  nombreEstrategia: "",
  PorceLocal: "",
  PorceVisitante: "",
  PorceEmpate: "",
  cuotaLocal: "",
  cuotaVisitante: "",
  cuotaEmpate: "",
};

const validationForm = (form) => {
  
  let error = {};

  if (!form.idEstrategia.trim()) {
    error.idEstrategia = "Debes seleccionar una estrategia";
  }
  if (!form.PorceLocal.trim()) {
    error.PorceLocal = "Debes ingresar un porcentaje para local";
  }
  if (!form.PorceVisitante.trim()) {
    error.PorceVisitante = "Debes ingresar un porcentaje para visitante";
  }
  if (!form.PorceEmpate.trim()) {
    error.PorceEmpate = "Debes ingresar un porcentaje para empate";
  }

  return error;

};

const ModalCompetition = ({ handleSubmitDetalleStrategy }) => {

  const {error, setError, form, setForm, handleChange } = UserForm(
    initialForm,
    validationForm
  );

  const handleSubmitModal = async () => {

    setError(validationForm(form));

    if (Object.keys(error).length === 0) {
      handleSubmitDetalleStrategy(form);
      setForm(initialForm);
    }
  
  };

  let classes = useStyle();

  const [strategies, setStrategies] = useState(null);

  useEffect(() => {
    const traerEstrategias = async () => {
      const data = await helpHttpAxios().get(`${API.URI}/strategies`);
      setStrategies(data);
    };

    traerEstrategias();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setForm(initialForm);
    setOpen(false);
  };

  const handleInputSelect = (e) => {

    let index = e.target.selectedIndex;
    form.nombreEstrategia = e.target.options[index].text;

    setForm({nombreEstrategia: e.target.options[index].text})
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
  }

  return (
    <div>
      <Button
        variant="outlined"
        className={classes.botonStrategy}
        fullWidth
        color="primary"
        onClick={handleClickOpen}
      >
        Gestionar Estrategias
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Gestionar Estrategias</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>
              Desde aqui podras agregar las estrategias, predicciones y
              porcentajes de cada competencia
            </DialogContentText>

            <FormControl className={classes.select} size="small">
              <InputLabel htmlFor="outlined-age-native-simple">
                Estrategia
              </InputLabel>
              <Select
                required
                native
                value={form.idEstrategia}
                onChange={handleInputSelect}
                label="Estrategia"
                name="idEstrategia"
              >
                <option aria-label="None" value="" />
                {strategies &&
                  strategies.map((el) => {
                    return (
                      <option key={el.idEstrategia} value={el.idEstrategia}>
                        {el.nombreEstrategia}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>

            <TextField
              autoFocus
              required
              size="small"
              InputProps={{
                inputProps: {
                  max: 100,
                  min: 1,
                },
              }}
              className={classes.textFields}
              value={form.PorceLocal}
              onChange={handleChange}
              name="PorceLocal"
              label="%Local"
              type="number"
            />

            <TextField
              autoFocus
              required
              size="small"
              InputProps={{
                inputProps: {
                  max: 100,
                  min: 1,
                },
              }}
              className={classes.textFields}
              value={form.PorceVisitante}
              onChange={handleChange}
              name="PorceVisitante"
              label="%Visitante"
              type="number"
            />

            <TextField
              autoFocus
              required
              size="small"
              InputProps={{
                inputProps: {
                  max: 100,
                  min: 1,
                },
              }}
              className={classes.textFields}
              value={form.PorceEmpate}
              onChange={handleChange}
              name="PorceEmpate"
              label="%Empate"
              type="number"
            />

            <TextField
              autoFocus
              required
              size="small"
              className={classes.textFields}
              value={form.cuotaLocal}
              onChange={handleChange}
              name="cuotaLocal"
              label="Cuota L"
              type="text"
            />

            <TextField
              autoFocus
              required
              size="small"
              className={classes.textFields}
              value={form.cuotaVisitante}
              onChange={handleChange}
              name="cuotaVisitante"
              label="Cuota V"
              type="text"
            />

            <TextField
              autoFocus
              required
              size="small"
              className={classes.textFields}
              value={form.cuotaEmpate}
              onChange={handleChange}
              name="cuotaEmpate"
              label="Cuota E"
              type="text"
            />

            {error.idEstrategia && (
              <small>{error.idEstrategia} </small>
            )}

            {error.PorceLocal && (
              <small>{error.PorceLocal} </small>
            )}

            {error.PorceVisitante && (
              <small>{error.PorceVisitante} </small>
            )}

            {error.PorceEmpate && (
              <small>{error.PorceEmpate} </small>
            )}
            
            
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => handleSubmitModal()} type="button" color="primary">
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ModalCompetition;
