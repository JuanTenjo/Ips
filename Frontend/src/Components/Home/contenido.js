import React from 'react';
import { Box, Grid } from '@material-ui/core'

const Contenido = () => {
    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
                    <Box
                        color='primary.contrastText'
                        bgcolor='primary.main'
                    >
                        xs 12
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={7}>
                    <Box
                        color='primary.contrastText'
                        bgcolor='error.main'
                        border={2}
                        borderColor="error.main"
                    >
                        xs 12
                    </Box>
                </Grid>
            </Grid>



        </div>
    );
}

export default Contenido;