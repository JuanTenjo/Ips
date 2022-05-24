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
  Label: {
    textAlign: "center",
  },
  DatePicket: {
    width: "100%",
    marginTop: theme.spacing(1),
  },

}));

//Inicial Form
const initialForm = {
   idPaciente: null,
   tipoDocumento: "",
   numeroDocumento: "",
   nombre: "",
   apellido: "",
   fechaNacimiento: "",
   edad: "",
   estado: 1,
};

const validationForm = (form,dataToEdit) => {
 
  const hoy = new Date();
  hoy.setUTCHours(0,0,0,0);
  let day = hoy.getDate()
  let month = hoy.getMonth() + 1
  let year = hoy.getFullYear()
  let hoyModi = new Date(year,month,day);

  let fechaconsulta = new Date(form.fechaconsulta); 
  
  let error = {};

  if (!form.tipoDocumento.trim()) {
    error.tipoDocumento = "Debes ingresar el tipo de documento";
  }
  if (!form.numeroDocumento.trim()) {
    error.numeroDocumento = "Debes ingresar el numero de documento";
  }
  if (!form.nombre.trim()) {
    error.nombre = "Debes ingresar el nombre";
  }
  if (!form.apellido.trim()) {
    error.apellido = "Debes ingresar el apellido";
  }
  if (!form.fechaNacimiento.trim()) {
    error.fechaNacimiento = "Debes ingresar la fecha de nacimiento";
  }

  if (!form.edad.trim()) {
    error.edad = "Debes ingresar la edad del pasciente";
  }
  return error;
};



const FormPasciente = ({ dataToEdit, setDataToEdit, createData, updateData }) => {
  let classes = useStyle();
  const [valor, setValor] = useState("");
  const [dataRoles, setDataTipoConsulta] = useState(null);
  const [dataPaciente, setDataPaciente] = useState(null);
  const [dataUsuario, setDataUsuario] = useState(null);
  const [dataFormula, setDataFormula] = useState(null);
  const [dataExmane,setDataExamen] = useState(null);
  //Hood Personalizado para valizado
  const { form, setForm, error, setError, handleChange, handleBlur,handleChangechecked } = UserForm(
    initialForm,
    validationForm
  );

  useEffect(() => {
    const traerTipoConsulta = async () => {
      const data = await helpHttpAxios().get(`${API.URI}/queries/get_tipo_consulta`);
      setDataTipoConsulta(data);
    };
    traerTipoConsulta();
  }, []);

  useEffect(() => {
    //Evalua cualquier cambio que tenga esa variable, esta oyendo siempre
    if (dataToEdit) {     
      setForm(dataToEdit);
      setError(validationForm(dataToEdit));
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit, setForm, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validationForm(form,dataToEdit));
    if (Object.keys(error).length === 0) {
      if (form.idPaciente  === null) { 
         createData(form);
      } else {
        updateData(form);
      }
      setForm(initialForm);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };
 
  const handleInputChange = (event) => {  
    setValor(event.target.value);
  }

  return (
    <div>
      <Grid container justifyContent="center">
        <h3>{dataToEdit ? "Actualizar paciente" : "Registrar paciente"}</h3>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Tipo Documento
              </InputLabel>
              <Select
                required
                native
                value={form.tipoDocumento}
                onChange={handleChange}
                label="Tipo Documento"
                onBlur={handleBlur}
                name="tipoDocumento"
              >
                <option aria-label="None" value="" />
                <option value="CC">CC</option>
                <option value="TI">TI</option>
                <option value="PS">PS</option>
              </Select>
            </FormControl>
            {error.tipoDocumento && <Alert severity="warning">{error.tipoDocumento}</Alert>}
          </Grid>

          <Grid item xs={6}>
            <TextField
                required={true}
                name="numeroDocumento"
                label="Numero De Documento"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={form.numeroDocumento}
                className={classes.text}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                />
            {error.numeroDocumento && <Alert severity="warning">{error.numeroDocumento}</Alert>}
          </Grid>
          <Grid item xs={6}>
            <TextField
                required={true}
                name="nombre"
                label="Nombre"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                value={form.nombre}
                className={classes.text}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                />
            {error.nombre && <Alert severity="warning">{error.nombre}</Alert>}
          </Grid>
          <Grid item xs={6}>
            <TextField
                required={true}
                name="apellido"
                label="Apellido"
                onChange={handleChange}
                type="text"
                onBlur={handleBlur}
                value={form.apellido}
                className={classes.text}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                />
            {error.apellido && <Alert severity="warning">{error.apellido}</Alert>}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={6}>
            <TextField
                required={true}
                name="fechaNacimiento"
                label="Fecha de nacimiento"
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
                value={form.fechaNacimiento}
                className={classes.text}
                />
            {error.fechaNacimiento && <Alert severity="warning">{error.fechaNacimiento}</Alert>}
          </Grid>
          <Grid item xs={6}>
          <TextField
                required={true}
                name="edad"
                label="Edad"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={form.edad}
                className={classes.text}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                />
            {error.edad && <Alert severity="warning">{error.edad}</Alert>}
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              className={classes.boton}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>

      </form>
    </div>
  );
};

export default FormPasciente;
