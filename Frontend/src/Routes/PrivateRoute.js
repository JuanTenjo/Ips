import { Route } from "react-router";
import { Redirect } from "react-router-dom";


let auth;
auth = true;

//console.log(window.localStorage.getItem('LoggedAppUser'))`

//para colocarle un alias a una props cuando utilizamos destructuracion lo hacemos con dos puntos :
const PrivateRoute = (props) => {

    const user = window.localStorage.getItem('LoggedAppUser');
    user ? auth = true : auth = false
    
    return (
    <Route exact={props.exact} path={props.path}>
        {auth ? <props.component/> : <Redirect to="/IniciarSesion"/>} 
    </Route>
    );
}


//Simular autenticacion

 
export default PrivateRoute;