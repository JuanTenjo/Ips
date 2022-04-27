import React from "react";
import { green } from "@material-ui/core/colors";
import AddBoxIcon from '@material-ui/icons/AddBox';

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
  } from "@material-ui/core";

//Estilos
const useStyle = makeStyles((theme) => ({
    table: {
      minWidth: 10,
    },
  }));


  

const TableCompetition = ({addCompetitionParley, dataCompetition}) => {

    
    let classes = useStyle();
    


    return (
        <Grid container justifyContent="center">
        <h5>Parleys Habilitados</h5>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ display: "none" }} align="center">
                  ID
                </TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Hora</TableCell>
                <TableCell align="center">Local</TableCell>
                <TableCell align="center">vs</TableCell>
                <TableCell align="center">Visitante</TableCell>
                <TableCell align="center">Agregar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataCompetition &&
                dataCompetition.map((row) => (
                  <TableRow key={row.idCompeticiones}>

                    <TableCell style={{ display: "none" }} align="center">{row.idCompeticiones}</TableCell>
                    <TableCell align="center">{row.fechaCompeticion}</TableCell>
                    <TableCell align="center">{row.horaCompeticion}</TableCell>
                    <TableCell align="center">{row.equipoLocal}</TableCell>
                    <TableCell align="center">VS</TableCell>
                    <TableCell align="center">{row.equipoVisitante}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="UpdateIcon"
                        onClick={() => addCompetitionParley(row)}
                      >
                        <AddBoxIcon
                          style={{ color: green[700] }}
               
                        />
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

export default TableCompetition;