import React, { useEffect } from "react";
import UserForm from "../../Hooks/useForm";
import Alert from "@material-ui/lab/Alert";

import {
  Grid,
  TextField,
  makeStyles,
  Button,
} from "@material-ui/core";

//Estilos
const useStyle = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  boton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
}));

//Inicial Form
const initialForm = {
  idpaises: null,
  codiPais: "",
  nombrePais: "",
};

//Validaciones
const validationForm = (form) => {
  let error = {};


  if (!form.codiPais.trim()) {
    error.codiPais = "El codigo del pais es requerido";
  }

  if (!form.nombrePais.trim()) {
    error.nombrePais = "El nombre del Pais es requerido";
  }

  return error;
};

//Componente
const FormPais = ({setFile, dataToEdit, setDataToEdit, createData, updateData }) => {

  let classes = useStyle();

  //Hood Personalizado para valizado
  const { form, setForm, error, setError, handleChange, handleBlur } = UserForm(
    initialForm,
    validationForm
  );

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
      setError(validationForm(dataToEdit));
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit, setForm, setError]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validationForm(form));
    if (Object.keys(error).length === 0) {
      if (form.idpaises === null) {
        createData(form);
      } else {
        updateData(form);
      }
      handleReset();
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
    document.getElementById("image").value = "";
    setFile(null);
  };

  const subirBandera = (e) => {
    setFile(e);
  }

  return (
    <>
      <Grid container justifyContent="center">
        <h3>{dataToEdit ? "Actualizar Pais" : "Ingresar Pais"}</h3>
      </Grid>

      <form onSubmit={handleSubmit} enctype="multipart/form-data">

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={4}>
            <TextField
              type="text"
              name="codiPais"
              label="Codigo del Pais"
              value={form.codiPais}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.codiPais && (
              <Alert severity="warning">{error.codiPais}</Alert>
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              name="nombrePais"
              label="Nombre Pais"
              value={form.nombrePais}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.nombrePais && (
              <Alert severity="warning">{error.nombrePais}</Alert>
            )}
          </Grid>

          <Grid item xs={4}>

          <label htmlFor="image">Buscar bandera del pais:</label>

          <input type="file" id="image" name="image" accept=".jpg, .jpeg, .png" onChange={(e) => subirBandera(e.target.files)} />

          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={handleReset}
              type="button"
              color="primary"
              className={classes.boton}
            >
              Limpiar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              className={classes.boton}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FormPais;
