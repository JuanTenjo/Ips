import React from 'react';
import logo from '../../assets/Logo.png';
import Alert from "@material-ui/lab/Alert";
import {
    Grid,
    TextField,
    Typography,
    makeStyles,
    Button,
    Link 
} from '@material-ui/core'

import UseForm from '../../Hooks/useForm'

const useStyles = makeStyles(() => ({
    text: {
        marginTop: '10px',
        width:'100%'
    },
    form: {
        padding: '5px',
    },
    boton: {
        width: '100%',
        marginTop: '20px'
    },
    linkRegistro: {
      marginTop: '20px',
      textAlign: 'center',
    },
    linkOLvidarContra: {
      marginTop: '40px',
      textAlign: 'center',
    }
}));


const initialForm = {
    //Lo hacemos para inicializar las variables del formulario y no nos salgan warning
    email: '',
    password: '',
}

const validationForm = (form) => {
    let error = {};
  
    //let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/; //Validacion para nombre
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/; //Validacion para correo
    // let regexComments = /^.{1,255}$/;//Vaya de 1 a 255 caracteres
    //let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; //Mayuscula, Minuscula y Numero
  
    //Trim se hace para bloquear que no se termine ni empiece con un caracter especial o un espacio en blanco
    if (!form.password.trim()) {
      error.password = "Ingresa tu contraseña"
    }

    if (!form.email.trim()) {
      error.email = "Ingresa tu correo"
    }else if(!regexEmail.test(form.email.trim())){
      error.email = "El email es incorrecto"
    }

    return error;

  };

const LoginForm = ({handleSubmit,setFuncion}) => {

    const styles = useStyles();

    const {
        form,
        error,
        setError,
        handleChange,
        handleBlur,
      } = UseForm(initialForm, validationForm);

    const Login = async (e) => {

      e.preventDefault();

      setError(validationForm(form));

      if (Object.keys(error).length === 0) {
  
        handleSubmit(form);
    
      }

    };

    return (
      <div>
        <Grid container justifyContent="center" alignContent="center">
          <Grid item xs={12}>
            <center>
              <img src={logo} alt="Logo Bet Solver" width="40%" />
            </center>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>

            <Typography align="center" variant="h5">
              Iniciar Sesion
            </Typography>

            <form onSubmit={Login} className={styles.form}>
              <TextField
                type="email"
                name="email"
                value={form.email}
                className={styles.text}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
                variant="outlined"
              />
           
              {error.email && (
                <Alert severity="warning">{error.email}</Alert>
              )}

              <TextField
                autoComplete="on"
                type="password"
                name="password"
                value={form.password}
                className={styles.text}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Contraseña"
                variant="outlined"
              />
             {error.password && (
                <Alert severity="warning">{error.password}</Alert>
              )}

              <Button
                className={styles.boton}
                type="submit"
                variant="contained"
                color="primary"
              >
                Ingresar
              </Button>

              <div className={styles.linkRegistro} >
                <label>¿No tienes una cuenta? </label>
                <Link href="#" underline='hover' className={styles.linkRegistro} onClick={() => setFuncion(1)}>
                  Registrate Gratis
                </Link>
              </div>

              <div className={styles.linkOLvidarContra} >
                <Link href="#" underline='hover' className={styles.linkRegistro}>
                  ¿Olvidaste tu contraseña? 
                </Link>     
              </div>
       
            </form>
               
          </Grid>
        </Grid>
      </div>
    );
}

export default LoginForm;