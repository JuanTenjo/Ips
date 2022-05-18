import React,{useEffect,useState} from 'react';
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
    const [itemsList,setItemList]= useState([])
        
    const Salir = () => {
      //Tumba la sesio por lo cual no tendra acceso a nada, con history.push modificamos la url para que quede limpia, y basta con solo
      //recargar la pagina para volver a login
      window.localStorage.removeItem('LoggedAppUser');
      history.push("/")
      window.location.reload();
    }
    const obtenerItemList = ()=>{
      const {tipoRol}=props;
      let itemsList = [
        {
          text: "Home",
          icon: <HomeIcon />,
          onClick: () => history.push("/"),
          tipoRol:""
        },
        {
          text: "Consultas",
          icon: <PlaylistAddIcon />,
          onClick: () => history.push("/gestionUser"),
          tipoRol:"Admin,Medico,Especialista"
        },
        {
          text: "Agregar Consulta",
          icon: <PlaylistAddIcon />,
          onClick: () => history.push("/gestionConsulta"),
          tipoRol:"Admin,Auxiliar"
        },
        {
          text: "Agregar Paciente",
          icon: <PlaylistAddIcon />,
          onClick: () => history.push("/gestionPasciente"),
          tipoRol:"Admin,Auxiliar"
        },
        {
          text: "Usuarios",
          icon: <PlaylistAddIcon />,
          onClick: () => history.push("/gestionUser"),
          tipoRol:"Admin"
        },
        {
          text: "Salir",
          icon: <ExitToAppIcon />,
          onClick: () => Salir(),
          tipoRol:""
        }
      ];
      const filter=itemsList.filter((e)=>e.tipoRol.includes(tipoRol)||e.tipoRol=="");
      setItemList(filter)
    }

    useEffect(() => {
      obtenerItemList()
    }, [])
    
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
