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
   idConsulta: null,
   idTipo: "",
   idPaciente: "",
   idUsuario: "",
   idTipoformula: "",
   horaIngreso: "",
   horaSalida: "",
   peso: "",
   estatura: "",
   sintomas: "",
   descripcion: "",
   asistio: false,
   fechaconsulta: "",
   examen1: "",
   examen2: "",
   examen3: "",

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
  if (!form.fechaconsulta.trim()) {
    error.fechaconsulta = "Debes ingresar la fecha de la competencia";
  }
  if (fechaconsulta < hoy) {
    error.fechaconsulta = "Debes seleccionar una fecha mayor a hoy";
  }
  if (!form.sintomas.trim()) {
    error.sintomas = "El campo sintomas de Usuario es requerido";
  }
  if (!form.descripcion.trim()) {
    error.descripcion = "El campo descripcion de Usuario es requerido";
  }
  if (!form.peso.trim()) {
    error.peso = "El campo peso de Usuario es requerido";
  }
  if (!form.estatura.trim()) {
    error.estatura = "El campo estatura es requerido";
  }
  if (form.idUsuario === "" || form.idUsuario === null) {
    error.idUsuario = "El Usuario es requerido";
  }
  if (form.idTipo === "" || form.idTipo === null) {
    error.idTipo = "El Tipo consulta es requerido";
  }
  if (form.idPaciente === "" || form.idPaciente === null) {
    error.idPaciente = "El Paciente es requerido";
  }
  if (form.idTipoformula === "" || form.idTipoformula === null) {
    error.idTipoformula = "Tipo formula es requerido";
  }
  if (!form.horaIngreso.trim()) {
    error.horaIngreso = "Debes ingresar la hora de la ingreso";
  }
  if (!form.horaSalida.trim()) {
    error.horaSalida = "Debes ingresar la hora de la salida";
  }

  return error;
};



const FormConsuta = ({ dataToEdit, setDataToEdit, createData, updateData }) => {
  let classes = useStyle();
 
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
      if (form.idConsulta === null) {
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
 
  return (
    <div>
      <Grid container justifyContent="center">
        <h3>{dataToEdit ? "Actualizar consulta" : "Registrar Consulta"}</h3>
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
                Tipo Consulta
              </InputLabel>
              <Select
                required
                native
                value={form.idTipo}
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
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Paciente
              </InputLabel>
              <Select
                required
                native
                value={form.idPaciente}
                onChange={handleChange}
                label="Permiso"
                onBlur={handleBlur}
                name="idPaciente"
              >
                <option aria-label="None" value="" />
                {dataPaciente &&
                  dataPaciente.map((el) => {
                    return (
                      <option key={el.idPaciente} value={el.idPaciente}>
                       {el.nombre}  {el.apellido}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            {error.idPaciente && <Alert severity="warning">{error.idPaciente}</Alert>}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Usuario
              </InputLabel>
              <Select
                required
                native
                value={form.idUsuario}
                onChange={handleChange}
                label="Permiso"
                onBlur={handleBlur}
                name="idUsuario"
              >
                <option aria-label="None" value="" />
                {dataUsuario &&
                  dataUsuario.map((el) => {
                    return (
                      <option key={el.idUsuario} value={el.idUsuario}>
                        {el.username} - {el.tipoRol}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            {error.idUsuario && <Alert severity="warning">{error.idUsuario}</Alert>}
          </Grid>
          <Grid item xs={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Formula
              </InputLabel>
              <Select
                required
                native
                value={form.idTipoformula}
                onChange={handleChange}
                label="Permiso"
                onBlur={handleBlur}
                name="idTipoformula"
              >
                <option aria-label="None" value="" />
                {dataFormula &&
                  dataFormula.map((el) => {
                    return (
                      <option key={el.idTipoformula} value={el.idTipoformula}>
                          {el.formula}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            {error.idTipoformula && <Alert severity="warning">{error.idTipoformula}</Alert>}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6} >
            <TextField
             required={true}
             name="horaIngreso"
             label="Hora de ingreso"
             onChange={handleChange}
             type="time"
             value={form.horaIngreso}
             className={classes.InputTime}
             InputLabelProps={{
               shrink: true,
             }}
             inputProps={{
               step: 300, // 5 min
             }}
            />
            {error.horaIngreso && <Alert severity="warning">{error.horaIngreso}</Alert>}
          </Grid>
          <Grid item xs={6} >
            <TextField
             required={true}
             name="horaSalida"
             label="Hora de Salida"
             onChange={handleChange}
             type="time"
             value={form.horaSalida}
             className={classes.InputTime}
             InputLabelProps={{
               shrink: true,
             }}
             inputProps={{
               step: 300, // 5 min
             }}
            />

            {error.horaSalida && <Alert severity="warning">{error.horaSalida}</Alert>}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6} >
            <TextField
              required
              type="text"
              name="peso"
              label="Peso"
              value={form.peso}
              InputProps={{
                inputProps: {
                 maxLength: 3,
                },
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.peso && <Alert severity="warning">{error.peso}</Alert>}
          </Grid>
          <Grid item xs={6} >
            <TextField
              required
              type="text"
              name="estatura"
              label="Estatura"
              value={form.estatura}
              onChange={handleChange}
              onBlur={handleBlur}
              InputProps={{
                inputProps: {
                 maxLength: 3,
                },
              }}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.estatura && <Alert severity="warning">{error.estatura}</Alert>}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
          <TextField
              required
              name="sintomas"
              label="Sintomas"
              value={form.sintomas}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              multiline
              rows={4}
            />

            {error.sintomas && <Alert severity="warning">{error.sintomas}</Alert>}
          </Grid>

          <Grid item xs={6}>
          <TextField
              required
              rows={4}
              name="descripcion"
              multiline
              label="Descripcion"
              value={form.descripcion}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
            />

            {error.descripcion && <Alert severity="warning">{error.descripcion}</Alert>}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
  
          <FormControlLabel
            control={
              <Checkbox
                checked={(form.asistio === 1 ? true: false)}
                value={form.asistio}
                onChange={handleChangechecked}
                name="asistio"
                color="primary"
              />
            }
            label="Asistio el paciente"
          />
          </Grid>

          <Grid item xs={6}>
          <TextField
                required={true}
                name="fechaconsulta"
                value={form.fechaconsulta}
                label="Fecha de la consulta"
                onChange={handleChange}
                type="date"
                className={classes.DatePicket}
                InputLabelProps={{
                shrink: true,
                }}         
            />
            {error.fechaconsulta && (
                <Alert severity="warning">{error.fechaconsulta}</Alert>
            )}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={4}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">
                Examen 1
              </InputLabel>
              <Select
                native
                value={form.examen1 ?? null}
                onChange={handleChange}
                label="Examen1"
                onBlur={handleBlur}
                name="examen1"
              >
                <option aria-label="None" value="" />
                {dataExmane &&
                  dataExmane.map((el) => {
                    return (
                      <option key={el.idExamen} value={el.idExamen}>
                        {el.tipoExamen} 
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            {error.examen1 && <Alert severity="warning">{error.examen1}</Alert>}
          </Grid>
          <Grid item xs={4}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
               <InputLabel htmlFor="outlined-age-native-simple">
                Examen 2
              </InputLabel>
              <Select
                native
                value={form.examen2 ?? null}
                onChange={handleChange}
                label="Examen2"
                onBlur={handleBlur}
                name="examen2"
              >
                <option aria-label="None" value="" />
                {dataExmane &&
                  dataExmane.map((el) => {
                    return (
                      <option key={el.idExamen} value={el.idExamen}>
                        {el.tipoExamen} 
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            {error.examen2 && <Alert severity="warning">{error.examen2}</Alert>}
          </Grid>
          <Grid item xs={4}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
               <InputLabel htmlFor="outlined-age-native-simple">
                Examen 3
              </InputLabel>
              <Select
                native
                value={form.examen3 ?? null}
                onChange={handleChange}
                label="Examen3"
                onBlur={handleBlur}
                name="examen3"
              >
                <option aria-label="None" value="" />
                {dataExmane &&
                  dataExmane.map((el) => {
                    return (
                      <option key={el.idExamen} value={el.idExamen}>
                        {el.tipoExamen} 
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            {error.examen3 && <Alert severity="warning">{error.examen3}</Alert>}
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
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FormConsuta;
