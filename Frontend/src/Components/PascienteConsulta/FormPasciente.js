import React, { useState, useEffect } from "react";
import Reactcheck from 'react';
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";
import UserForm from "../../Hooks/useForm";
import Alert from "@material-ui/lab/Alert";
import API from "../../Utils/dominioBackend";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  InputLabel,
  FormControl,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
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
   idPasciente: null,
   tipoDocumento: "",
   numeroDocumento: "",
   nombre: "",
   apellido: "",
   fechaNacimiento: "",
   edad: "0",
   estado: true,
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
//   if (!form.fechaconsulta.trim()) {
//     error.fechaconsulta = "Debes ingresar la fecha de la competencia";
//   }

//   if (fechaconsulta < hoy) {
//     error.fechaconsulta = "Debes seleccionar una fecha mayor a hoy";
//   }
//   if (!form.sintomas.trim()) {
//     error.sintomas = "El campo sintomas de Usuario es requerido";
//   }
//   if (!form.descripcion.trim()) {
//     error.descripcion = "El campo descripcion de Usuario es requerido";
//   }
//   if (!form.peso.trim()) {
//     error.peso = "El campo peso de Usuario es requerido";
//   }

//   if (!form.valor  === "" || form.valor === null) {
//     error.valor = "El campo valor es requerido";
//   }
//   if (!form.estatura.trim()) {
//     error.estatura = "El campo estatura es requerido";
//   }
//   if (form.idUsuario === "" || form.idUsuario === null) {
//     error.idUsuario = "El Usuario es requerido";
//   }
//   if (form.idTipo === "" || form.idTipo === null) {
//     error.idTipo = "El Tipo consulta es requerido";
//   }
//   if (form.idPaciente === "" || form.idPaciente === null) {
//     error.idPaciente = "El Paciente es requerido";
//   }
//   if (form.idTipoformula === "" || form.idTipoformula === null) {
//     error.idTipoformula = "Tipo formula es requerido";
//   }
//   if (!form.horaIngreso.trim()) {
//     error.horaIngreso = "Debes ingresar la hora de la ingreso";
//   }
//   if (!form.horaSalida.trim()) {
//     error.horaSalida = "Debes ingresar la hora de la salida";
//   }

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

    const traerPaciente = async () => {
        const data = await helpHttpAxios().get(`${API.URI}/queries/get_paciente`);
        setDataPaciente(data);
    };
    const traerUsuarios = async () => {
        const data = await helpHttpAxios().get(`${API.URI}/queries/get_usuario`);
        setDataUsuario(data);
    };
    const traerFormular = async () => {
        const data = await helpHttpAxios().get(`${API.URI}/queries/get_formula`);
        setDataFormula(data);
    };
    const traerExamen = async () => {
      const data = await helpHttpAxios().get(`${API.URI}/queries/get_examen`);
      setDataExamen(data);
    };
    traerTipoConsulta();
    traerPaciente();
    traerUsuarios();
    traerFormular();
    traerExamen();
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
        <h3>{dataToEdit ? "Actualizar pasciente" : "Registrar pasciente"}</h3>
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
                label="Permiso"
                onBlur={handleBlur}
                name="idTipo"
              >
                <option aria-label="None" value="" />
                {dataRoles &&
                  dataRoles.map((el) => {
                    return (
                      <option key={el.idTipoConsulta} value={el.idTipoConsulta}>
                          {el.consulta}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            {error.idTipo && <Alert severity="warning">{error.idTipo}</Alert>}
          </Grid>

          <Grid item xs={6}>
            <TextField
                required={true}
                name="numeroDocumento"
                label="Numero De Documento"
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
                type="text"
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
                name="apellido"
                label="Apellido"
                onChange={handleChange}
                type="text"
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
        </Grid>
        <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={6}>
            <TextField
                required={true}
                name="fechaNacimiento"
                label="Fecha de nacimiento"
                onChange={handleChange}
                type="date"
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
                name="edad"
                label="Edad"
                onChange={handleChange}
                type="text"
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
        </Grid>

      </form>
    </div>
  );
};

export default FormPasciente;
