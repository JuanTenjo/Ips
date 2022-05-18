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
  

const TableUser = ({setdataToEdit,dataUsuarios,deleteData}) => {

    
    let classes = useStyle();
    
    const [open, setOpen] = useState(false);
    const [InfoDialog, SetInfoDialog] = useState(initalDialog);

    const handleUpdate = (data) => {

      const row = {
        idUsuario: data.idUsuario,
        idRol:  data.idRol,
        username:  data.username,
        email:  data.email,
        password: "",
        passwordConfirm: "",
      };
      
      
      setdataToEdit(row);


    };

    const handleDialog = (operacion, ID) => {
        setOpen(!open);
        SetInfoDialog({
        tipo: "Usuario",
        funcion: deleteData,
        operacion,
        ID,
        });
    };
    


    return (
        <Grid container justifyContent="center">
        <h3>Lista de Usuarios</h3>
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
                <TableCell align="center">idRol</TableCell>
                <TableCell align="center">UserName</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Actualizar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataUsuarios &&
                dataUsuarios.map((row) => (
                  <TableRow key={row.idUsuario}>

                    <TableCell style={{ display: "none" }} align="center">{row.idUsuario}</TableCell>
                    <TableCell align="center">{row.idRol}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="UpdateIcon"
                        onClick={() => handleUpdate(row)}
                      >
                        <UpdateIcon
                          style={{ color: yellow[700] }}
                          fontSize="small"
                        />
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

export default TableUser;