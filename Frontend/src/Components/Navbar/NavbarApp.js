import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
    },

}))



const NavBar = ({accionAbrir}) => {

    const styles = useStyles();

    return (
        <AppBar className={styles.appBar}>
            <Toolbar>
                <IconButton color="inherit" aria-label="menu" className={styles.menuButton} onClick={accionAbrir}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={styles.title}>
                    IPS
                </Typography>
                {/* <Button variant="text" color="inherit">
                    Login
                </Button> */}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;