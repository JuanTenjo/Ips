import React, { useState } from "react";
import { Grid, makeStyles, Hidden, FormHelperText } from "@material-ui/core";
import LoginForm from "../Components/Login/LoginForm";
import RegisterForm from "../Components/Login/RegisterForm";
import Banner from "../assets/Banner.jpg";
import Message from "../Components/Necesarios/Message";
import { helpHttpAxios } from "../Helpers/helpHttpsAxios";
import API from "../Utils/dominioBackend";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  Banner: {
    maxWidth:"82%",
    margin:"0",
  },
  margenSuperior: {
    marginTop: "20%",
  },
  image:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const PageLogin = ({ Auth }) => {

    const styles = useStyles();
    const [response, setResponse] = useState(null);
    const [funcion, setFuncion] = useState(0);
    const [error, setError] = useState({});

    const handleFuncion = () =>{
      setFuncion(0);
    }

    
  const createData = async (data) => {

    let URL = `${API.URI}/user/register`;

    let config = {
      data: data,
    };

    const res = await helpHttpAxios().post(URL, config);

    if (!res.err) {
      setResponse(res.message);
      setTimeout(() => {
        setResponse(false);
      }, 5000);
    } else {
      let errores = { errores: res.message };
      setError(errores);
      setTimeout(() => {
        setError(false);
      }, 9000);
    }

  };
    
    const handleSubmit = async (data) => {

        let config = {
         data: data,
        };

        const BaseUrl = `${API.URI}/auth/login`;

        const res = await helpHttpAxios().post(BaseUrl, config);
        if (!res.err) {

            if (res.rol === 3) {

                window.localStorage.setItem("LoggedAppUser", JSON.stringify(res.token))

                setResponse(res.msg);

                setTimeout(() => {
                    setResponse(false);
                }, 5000);

            }else{
                let errores = { errores: ["No tienes permiso de Administrador para ingresar"] };
                setError(errores);
                setTimeout(() => {
                    setError(false);
                }, 9000);
            }

        } else {
            let errores = { errores: res.message };
            setError(errores);
            setTimeout(() => {
                setError(false);
            }, 9000);
        }

    };


  return (
    <div className={styles.container}>
      <Grid container>
      

        <Grid item xs={12} sm={12} md={6}>

          {funcion === 0 ?

            <div className={styles.margenSuperior}>
              <LoginForm handleSubmit={handleSubmit} setFuncion={setFuncion} /> 
            </div>

            :

            <RegisterForm handleFuncion={handleFuncion} createData={createData} />
            
          }

        {error.errores &&
          error.errores.map((el) => {
          return <Message key={el} msg={el} estado={false} />;
        })}

        </Grid>


        {response && Auth()}

        <Grid item md={6} className={styles.image}>

          <Hidden smDown>
             
            <center>
              <img
                src={Banner}
                alt="Banner Bet Solver"
                className={styles.Banner}
              />
            </center>

          </Hidden>

        </Grid>

      </Grid>

    </div>
  );
};

export default PageLogin;
