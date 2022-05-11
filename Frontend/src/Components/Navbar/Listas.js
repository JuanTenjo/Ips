import React from 'react';
import { 
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from "react-router-dom";

const Listas = (props) => {

    const { history } = props;

        
    const Salir = () => {
      //Tumba la sesio por lo cual no tendra acceso a nada, con history.push modificamos la url para que quede limpia, y basta con solo
      //recargar la pagina para volver a login
      window.localStorage.removeItem('LoggedAppUser');
      history.push("/")
      window.location.reload();
    }

    const itemsList = [
      {
        text: "Home",
        icon: <HomeIcon />,
        onClick: () => history.push("/") 
      },
      {
        text: "Consultas",
        icon: <PlaylistAddIcon />,
        onClick: () => history.push("/gestionUser")
      },
      {
        text: "Agregar Consulta",
        icon: <PlaylistAddIcon />,
        onClick: () => history.push("/gestionUser")
      },
      {
        text: "Agregar Paciente",
        icon: <PlaylistAddIcon />,
        onClick: () => history.push("/gestionTeam")
      },
      {
        text: "Usuarios",
        icon: <PlaylistAddIcon />,
        onClick: () => history.push("/gestionTeam")
      },
      {
        text: "Salir",
        icon: <ExitToAppIcon />,
        onClick: () => Salir()
      }
    ];


    return ( 
        <div>
            <List component='nav'>
            {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
                <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
                </ListItem>
            );
            })}
            </List>
        </div>
     );
}

export default withRouter(Listas);
