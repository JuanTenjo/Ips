import React from 'react';
import{
    makeStyles,
    Drawer,
    Divider
} from '@material-ui/core'
import Listas from '../Navbar/Listas';
import logo from '../../assets/Logo.png';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}))

const Cajon = ({variant,open,onClose,nombreUser}) => {

    const classes = useStyles();
    return (    
        <Drawer
        className={classes.drawer} 
        classes={{
            paper: classes.drawerPaper,
        }}
        variant={variant}
        open={open}
        onClose={onClose ? onClose : null}
        anchor="left"
        >
        <div className={classes.toolbar}>
            <center>
              <img src={logo} alt="Logo Bet Solver" width="95%" />
              <h3>{nombreUser}</h3>
            </center>
        </div>
        <Divider/>

        <Listas/>

        </Drawer>
     );
}
 
export default Cajon;