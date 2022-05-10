import React, { useState, useEffect } from "react";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";
import UserForm from "../../Hooks/useForm";
import Alert from "@material-ui/lab/Alert";
import logo from '../../assets/Logo.png';
import API from "../../Utils/dominioBackend";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  InputLabel,
  FormControl,
  Select,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Link
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
  LinkVolver: {
    marginTop: theme.spacing(2),
  }
}));

//Inicial Form
const initialForm = {
  idRol: "",
  username: "",
  email: "",
  password: "",
  passwordConfirm:""
};

const validationForm = (form) => {
  let error = {};

  if (!form.username.trim()) {
    error.username = "El campo Nombre de Usuario es requerido";
  }


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
  
  if (!form.email.trim()) {
    error.email = "El campo email es requerido";
  }

  if (form.idRol === "" || form.idRol === null) {
    error.idRol = "El rol es requerido";
  }

  return error;
};



const RegisterForm = ({ handleFuncion,createData }) => {
  let classes = useStyle();

  const [roles, setroles] = useState(null);

  const { form, error, setError, handleChange, handleBlur } = UserForm(
    initialForm,
    validationForm
  );


  useEffect(() => {
    const traerRoles = async () => {
      const data = await helpHttpAxios().get(`${API.URI}/roles/get_roles`);
      setroles(data);
    };

    traerRoles();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(validationForm(form));
    if (Object.keys(error).length === 0) {
        createData(form);
    }
  };


  return (
    <div>
    <Grid item xs={12}>
        <center>
            <img src={logo} alt="Logo Bet Solver" width="40%" />
        </center>
        <Typography align="center" variant="h5">
        Registrate
    </Typography>
    </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" spacing={1}>
        
          <Grid item xs={12}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="outlined-age-native-simple">Rol</InputLabel>
              <Select
                required
                native
                value={form.idRol}
                onChange={handleChange}
                label="Rol"
                onBlur={handleBlur}
                name="idRol"
              >
                <option aria-label="None" value="" />
                {roles &&
                  roles.map((el) => {
                    return (
                      <option key={el.idRol} value={el.idRol}>
                        {el.tipoRol}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>

            {error.idRol && (
              <Alert severity="warning">{error.idRol}</Alert>
            )}
          </Grid>

        
        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.boton}
            >
              Enviar
            </Button>
          </Grid>
          <div className={classes.LinkVolver} >
                <Link href="#" underline='hover' className={classes.linkRegistro} onClick={() => handleFuncion()}>
                  Iniciar Sesión
                </Link>
              </div>
        </Grid>
      </form>
    </div>
  );
};

export default RegisterForm;
