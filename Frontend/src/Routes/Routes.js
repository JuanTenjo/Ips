import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NavBar from "../Components/Navbar/NavbarApp";
import { Hidden, makeStyles } from "@material-ui/core";
import Cajon from "../Components/Home/cajon";
import axios from "axios";
import Home from "../Pages/PageHome";
import PageLogin from "../Pages/PageLogin";
import PageUser from "../Pages/PageUser";
import PageTeam from '../Pages/PageTeam'
import PageLeague from "../Pages/PageLeague";
import PageCompetition from "../Pages/PageCompetition";
import PagePais from "../Pages/PagePais";
import PageParley from "../Pages/PageParley";
import PageMembresias from "../Pages/PageMembresia";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const RoutesLogged = ({ nombreUser, rolUser}) => {

  const classes = useStyle();
  const [abrir, setAbrir] = useState(false);

  const AccionAbrir = () => {
    setAbrir(!abrir);
  };

  return (

    <div className={classes.root}>

      {rolUser == null ?  

        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/membresias" component={PageMembresias} />
        </Switch>

      :
        <>
          <NavBar accionAbrir={AccionAbrir} />
          <Hidden xsDown>
            <Cajon variant="permanent" nombreUser={nombreUser} open={true} />
          </Hidden>
          <Hidden smUp>
            <Cajon variant="temporary" nombreUser={nombreUser} open={abrir} onClose={AccionAbrir} />
          </Hidden>
          <Switch>
          <Route exact path="/gestionTeam" component={PageTeam} />
            <Route exact path="/gestionUser" component={PageUser} />
            {/*
              <Route exact path="/gestionParley" component={PageParley} />
              <Route exact path="/gestionPais" component={PagePais} />
              <Route exact path="/gestionCompetition" component={PageCompetition} />
            
              <Route exact path="/gestionLeague" component={PageLeague} />*/
            }
            
            {/* <Route exact path="/gestionUser" render={props => <GestionUserApp {...props} />} /> */}
            <PrivateRoute exact path="/" component={Home} />

            {/* <Route exact path="/IniciarSesion" component={LoginApp} />
                <Route exact path="/">
                  <Redirect to="/IniciarSesion" />
                </Route> */}
          </Switch>
        </>
      }
    </div>
  );
};

const Routes = () => {

  const [auth, setAuth] = useState(false);
  const [nombreUser, setNombreUser] = useState('');

  useEffect(() => {
    AccionAuth();
  }, []); //Cuando el arrayt de dependencia esta vacios solo se va a ejecuar una vez al cargar el componente

  const AccionAuth = () => {

    const Logged = window.localStorage.getItem("LoggedAppUser");

    if (Logged) {

      const token = JSON.parse(Logged);

      const requestUser = async () => {

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        const requestUser = await axios.get("http://localhost:4000/auth/getinfotoken", config);
        
        if(requestUser){
          setNombreUser(requestUser.data[0].usuario)
          setAuth(token);
        }else{
          setAuth(false)
        }

      }


      requestUser();    

    } else {
      setAuth(false);
    }

  };

  return <>{auth ? <RoutesLogged nombreUser={nombreUser} rolUser={3} /> : <PageLogin Auth={AccionAuth} />}</>;

};

export default Routes;
