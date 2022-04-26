import React, { useState } from 'react';
import NavBar from '../Navbar/NavbarApp';
import{
    Hidden,
    makeStyles
} from '@material-ui/core'
import Cajon from './cajon';
import Contenido from './contenido';

const useStyle = makeStyles(theme => ({
    root:{
        display: 'flex',
    },
      // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

const Contenedor = () => {

    const classes = useStyle();

    const [abrir, setAbrir] = useState(false);

    const AccionAbrir = () => {
        setAbrir(!abrir);
    }
    

    return ( 
        <div className={classes.root}>
            <NavBar  accionAbrir={AccionAbrir}/>
            <Hidden xsDown>
                <Cajon  variant="permanent" open={true} />
            </Hidden>
            <Hidden smUp>
                <Cajon  variant="temporary" open={abrir} onClose={AccionAbrir}  />
            </Hidden>

            <div className={classes.content}>
                <div className={classes.toolbar}></div>
                    <Contenido/>
            </div>

        </div>
     );
}
 
export default Contenedor;