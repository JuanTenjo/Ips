import React from 'react';
import {
    Typography,
    withWidth,
    Hidden,
    Button
} from '@material-ui/core'

const Oculto = (props) => {
    return ( 
        <div>
            <Typography variant="h6" color="initial">
                Ancho: {props.width}
            </Typography>
            {/* Down quiere decir que oculta cuando sea igual o infeior al tamano que le pasemos*/}
            {/*Up quiere decir que oculta cuando sea igual o superior  al tamano que le pasemos*/}
            <Hidden mdDown>
                <Button variant="contained" color="primary">
                    Se oculta cuando sea igual o menor a md
                </Button>
            </Hidden>
            <Hidden lgUp>
                <Button variant="contained" color="primary">
                    Se oculta cuando es igual a lg o mayor
                </Button>
            </Hidden>
            <Hidden only={['lg','md']}>
                <Button variant="contained" color="primary">
                    Sola mente oculto en lg y md
                </Button>
            </Hidden>
        </div>
     );
}
 
export default withWidth()(Oculto);