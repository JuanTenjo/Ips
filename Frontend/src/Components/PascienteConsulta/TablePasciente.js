import React, { useState } from "react";
import { yellow, red, green } from "@material-ui/core/colors";
import UpdateIcon from "@material-ui/icons/Update";
import ClearIcon from "@material-ui/icons/Clear";
import Dialogo from "../Necesarios/Dialogo";
import CheckIcon from "@material-ui/icons/Check";

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

  const initalDialog = {
    tipo: "",
    funcion: false,
    operacion: "",
  };
  

const TablePasciente = ({setdataToEdit,dataUsuarios,deleteData}) => {

    
    let classes = useStyle();
    
    const [open, setOpen] = useState(false);
    const [InfoDialog, SetInfoDialog] = useState(initalDialog);

    const handleUpdate = (data) => {

      const row = {
        idPaciente: data.idPaciente,
        tipoDocumento: data.tipoDocumento,
        numeroDocumento: data.numeroDocumento,
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: data.fechaNacimiento,
        edad: data.edad,
        estado: data.estado,
      };
      
      setdataToEdit(row);


    };

    const handleDialog = (operacion, ID) => {
        setOpen(!open);
        SetInfoDialog({
        tipo: "Paciente",
        funcion: deleteData,
        operacion,
        ID,
        });
    };
    


    return (
        <Grid container justifyContent="center">
        <h3>Lista de Consulta</h3>
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
                <TableCell align="center">tipoDocumento </TableCell>
                <TableCell align="center">numeroDocumento</TableCell>
                <TableCell align="center">nombre</TableCell>
                <TableCell align="center">apellido</TableCell>
                <TableCell align="center">fechaNacimiento</TableCell>
                <TableCell align="center">edad</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Actualizar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataUsuarios &&
                dataUsuarios.map((row) => (
                  <TableRow key={row.idPaciente }>

                    <TableCell style={{ display: "none" }} align="center">{row.idPaciente}</TableCell>
                    <TableCell align="center">{row.tipoDocumento}</TableCell>
                    <TableCell align="center">{row.numeroDocumento}</TableCell>
                    <TableCell align="center">{row.nombre}</TableCell>
                    <TableCell align="center">{row.apellido}</TableCell> 
                    <TableCell align="center">{row.fechaNacimiento}</TableCell>
                    <TableCell align="center">{row.edad}</TableCell>    
                    {row.estado === 0 ? (
                      <TableCell align="center">
                        <IconButton aria-label="delete" onClick={() => deleteData(row.idPaciente,1)}>
                          <ClearIcon style={{ color: red[700] }} fontSize="small" />
                        </IconButton>
                      </TableCell>
                    ) :
                      <TableCell align="center">
                        <IconButton aria-label="updated" onClick={() => deleteData(row.idPaciente,0)}>
                          <CheckIcon style={{ color: green[700] }} fontSize="small" />
                        </IconButton>
                      </TableCell>
                    }
                    <TableCell align="center">
                        <IconButton aria-label="updated" onClick={() => handleUpdate(row)}>
                          <UpdateIcon style={{ color: yellow[700] }} fontSize="small" />
                        </IconButton>
                      </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {open ? (
          <Dialogo handleDialog={handleDialog} InfoDialog={InfoDialog} />
        ) : null}
      </Grid>
    );
}

export default TablePasciente;