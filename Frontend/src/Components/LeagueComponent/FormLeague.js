import React, { useState, useEffect } from "react";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";
import UserForm from "../../Hooks/useForm";
import Alert from "@material-ui/lab/Alert";
import API from "../../Utils/dominioBackend";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  InputLabel,
  FormControl,
  Select,
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
  codiPais: "",
  nombreLiga: "",
  habilitada: true,
  idLigas: null,
};

//Validaciones
const validationForm = (form) => {
  let error = {};

  //let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //Validacion para nombre

  //Trim se hace para bloquear que no se termine ni empiece con un caracter especial o un espacio en blanco
  if (!form.nombreLiga.trim()) {
    error.nombreLiga = "El campo nombre liga es requerido";
  }

  if (!form.codiPais.trim()) {
    error.codiPais = "El codigo del pais es requerido";
  }

  return error;
};

//Componente
const FormLeague = ({ dataToEdit, setDataToEdit, createData, updateData }) => {

  let classes = useStyle();


  const [dataPaises, setDataPaises] = useState();

  //Hood Personalizado para valizado
  const {
    form,
    setForm,
    error,
    setError,
    handleChange,
    handleBlur,
  } = UserForm(initialForm, validationForm);

  useEffect(() => {
    //Evalua cualquier cambio que tenga esa variable, esta oyendo siempre

    if (dataToEdit) {
      setForm(dataToEdit);
      setError(validationForm(dataToEdit));
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit,setForm,setError]);

  useEffect(() => {
    //Se trae el options de paises
    const traerPais = async () => {
      const data = await helpHttpAxios().get(`${API.URI}/country`);
      setDataPaises(data);
    };
    traerPais();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validationForm(form));
    if (Object.keys(error).length === 0) {
      if (form.idLigas === null) {
        createData(form);
      } else {
        console.log(form);
        updateData(form);
      }
      handleReset();
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <>
      <Grid container justifyContent="center">
        <h3>{dataToEdit ? "Actualizar Liga" : "Ingresar Liga"}</h3>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">Pais</InputLabel>
              <Select
                native
                value={form.codiPais}
                onChange={handleChange}
                label="Pais"
                onBlur={handleBlur}
                name="codiPais"
              >
                <option aria-label="None" value="" />
                {dataPaises &&
                  dataPaises.map((el) => {
                    return (
                      <option key={el.codiPais} value={el.codiPais}>
                        {el.nombrePais}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>

            {error.codiPais && (
              <Alert severity="warning">{error.codiPais}</Alert>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              name="nombreLiga"
              label="Nombre Liga"
              value={form.nombreLiga}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.nombreLiga && (
              <Alert severity="warning">{error.nombreLiga}</Alert>
            )}
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

export default FormLeague;
