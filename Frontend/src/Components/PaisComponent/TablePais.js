import React from 'react';
import { yellow } from '@material-ui/core/colors';
import UpdateIcon from '@material-ui/icons/Update';

import {
    makeStyles,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@material-ui/core'

//Estilos
const useStyle = makeStyles((theme) => ({
    table: {
        minWidth: 10,
    },
}));


const TablePais = ({setdataToEdit,dataPais}) => {


    const handleUpdate = (data) => {
        setdataToEdit(data);
    }


    let classes = useStyle();

    return (

        <Grid container justifyContent="center">
            <h3>Lista de países</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Codigo</TableCell>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Bandera</TableCell>
                            <TableCell align="center">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataPais && dataPais.map((row) => (
                            <TableRow key={row.codiPais}>
                                <TableCell align="center">{row.codiPais}</TableCell>
                                <TableCell align="center">{row.nombrePais}</TableCell>
            
                                <TableCell align="center"><img src={row.logoPais} width="40px" alt={row.nombrePais}/></TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="UpdateIcon" onClick={() => handleUpdate(row)}>
                                        <UpdateIcon style={{ color: yellow[700] }} fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </Grid>
    );
}

export default TablePais;