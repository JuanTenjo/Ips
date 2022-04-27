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
  habilitado: true,
  idEquipos: null,
  nombreEquipo: "",
  idLigas: "",
  nombreLiga: "",
};

//Validaciones
const validationForm = (form) => {

  let error = {};

  //let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //Validacion para nombre

  //Trim se hace para bloquear que no se termine ni empiece con un caracter especial o un espacio en blanco
  if (!form.nombreEquipo.trim()) {
    error.nombreEquipo = "El campo nombre del equipo es requerido";
  }
  if(form.idLigas === "" || form.idLigas === null){
    error.idLigas = "El codigo de la liga es requerido";
  }



  return error;
};

const FormTeam = ({ dataToEdit, setDataToEdit, createData, updateData }) => {
  let classes = useStyle();

  const [dataLigas, setDataLigas] = useState();
  const [dataPaises, setDataPaises] = useState(null);
  const [CodiPais, setCodiPais] = useState("");
    //Hood Personalizado para valizado
    const {
        form,
        setForm,
        error,
        setError,
        handleChange,
        handleBlur,
      } = UserForm(initialForm, validationForm);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(validationForm(form));
        if (Object.keys(error).length === 0) {
          if (form.idEquipos === null) {
            createData(form);
          } else {
            updateData(form);
          }
          handleReset();
        }
      };
    
      const handleReset = () => {
        setCodiPais("");
        setForm(initialForm);
        setDataToEdit(null);
      };

      
      const traerPais = async () => {
        const data = await helpHttpAxios().get(`${API.URI}/country`);
        setDataPaises(data);
      };

      useEffect(() => {
        traerPais();
      }, []);

      useEffect(() => {
        //Se trae el options de paises
        const traerLigas = async () => {
          const data = await helpHttpAxios().get(`${API.URI}/league/${CodiPais}`);
          setDataLigas(data);
        };
        traerLigas();
      }, [CodiPais]);

      useEffect(() => {
        //Evalua cualquier cambio que tenga esa variable, esta oyendo siempre
        if (dataToEdit) {
          setCodiPais(dataToEdit.codiPais)
          setForm(dataToEdit);
          setError(validationForm(dataToEdit));
        } else {
          setForm(initialForm);
        }
      }, [dataToEdit,setForm,setError]);
    
      const handleSelectPais = (e) => {
        setCodiPais(e.target.value);
      };
    

  return (
    <div>
      <Grid container justifyContent="center">
        <h3>{dataToEdit ? "Actualizar Equipo" : "Ingresar Equipo"}</h3>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={4}>
          <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  size="small"
                >
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Pais
                  </InputLabel>
                  <Select
                    required
                    native
                    value={CodiPais}
                    onChange={handleSelectPais}
                    label="Pais"
                    name="CodiPais"
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

          </Grid>
          <Grid item xs={4}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">Ligas</InputLabel>
              <Select
                native
                value={form.idLigas}
                onChange={handleChange}
                label="Ligas"
                onBlur={handleBlur}
                name="idLigas"
              >
                <option aria-label="None" value="" />
                {dataLigas &&
                    dataLigas.map((el) => {
                    return (
                      <option key={el.idLigas} value={el.idLigas}>
                        {el.nombreLiga}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>

            {error.idLigas && (
              <Alert severity="warning">{error.idLigas}</Alert>
            )}


          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              name="nombreEquipo"
              label="Nombre Equipo"
              value={form.nombreEquipo}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.nombreEquipo && (
              <Alert severity="warning">{error.nombreEquipo}</Alert>
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
    </div>
  );
};

export default FormTeam;
