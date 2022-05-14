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
  }
}));

//Inicial Form
const initialForm = {
  idUsuario: null,
  idRol: "",
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const validationForm = (form,dataToEdit) => {
  let error = {};

  if (!form.username.trim()) {
    error.username = "El campo Nombre de Usuario es requerido";
  }
if(!dataToEdit){
  if (!form.password.trim()) {
    error.password = "El campo password es requerido";
  }else{  
      if(form.password !== form.passwordConfirm){
        error.password = "El campo password y confirme password no son iguales";
      }
  }
    if (!form.passwordConfirm&&!form.passwordConfirm.trim()) {
      error.passwordConfirm = "Debes confirmar la password";
    }
}
  
  if (!form.email.trim()) {
    error.email = "El campo email es requerido";
  }

  if (form.idRol === "" || form.idRol === null) {
    error.idRol = "El rol es requerido";
  }

  return error;
};



const FormUser = ({ dataToEdit, setDataToEdit, createData, updateData }) => {
  let classes = useStyle();

  const [dataRoles, setDataRoles] = useState(null);

  //Hood Personalizado para valizado
  const { form, setForm, error, setError, handleChange, handleBlur } = UserForm(
    initialForm,
    validationForm
  );

  //const { data, isPending, error } = useAxios(urlPaises);



  useEffect(() => {
    const traerRoles = async () => {
      const data = await helpHttpAxios().get(`${API.URI}/roles/get_roles`);
      setDataRoles(data);
    };

    traerRoles();
  }, []);

  useEffect(() => {
    //Evalua cualquier cambio que tenga esa variable, esta oyendo siempre
    if (dataToEdit) {

      document.getElementById("password").setAttribute("disabled","");
      document.getElementById("passwordConfirm").setAttribute("disabled","");

      setForm(dataToEdit);
      setError(validationForm(dataToEdit));
    } else {

      document.getElementById("password").removeAttribute("disabled");
      document.getElementById("passwordConfirm").removeAttribute("disabled");

      setForm(initialForm);
    }
  }, [dataToEdit, setForm, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validationForm(form,dataToEdit));
    if (Object.keys(error).length === 0) {
      if (form.idUsuario === null) {
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
        <h3>{dataToEdit ? "Actualizar Usuario" : "Ingresar Usuario"}</h3>
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
                Rol
              </InputLabel>
              <Select
                required
                native
                value={form.idRol}
                onChange={handleChange}
                label="Permiso"
                onBlur={handleBlur}
                name="idRol"
              >
                <option aria-label="None" value="" />
                {dataRoles &&
                  dataRoles.map((el) => {
                    return (
                      <option key={el.idRol} value={el.idRol}>
                        {el.tipoRol}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
            {error.idRol && <Alert severity="warning">{error.idRol}</Alert>}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <TextField
              required
              type="text"
              name="username"
              label="Username"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.username && <Alert severity="warning">{error.username}</Alert>}
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <TextField
              required
              type="Email"
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              variant="outlined"
              size="small"
            />

            {error.email && <Alert severity="warning">{error.email}</Alert>}
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <TextField
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              name="password"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              size="small"
            />
            {error.password && <Alert severity="warning">{error.password}</Alert>}
          </Grid>

          <Grid item xs={6}>
            <TextField
              value={form.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes.text}
              name="passwordConfirm"
              id="passwordConfirm"
              label="Confirme Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              size="small"
            />
            {error.passwordConfirm && <Alert severity="warning">{error.passwordConfirm}</Alert>}
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

export default FormUser;
