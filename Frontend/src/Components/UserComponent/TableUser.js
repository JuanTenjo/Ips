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
        idUsuarios: data.idUsuarios,
        idRol:  data.idRol,
        codiPais:  data.CodiPais,
        nombre:  data.nombre,
        apellidos:  data.apellidos,
        email:  data.email,
        password: "",
        passwordConfirm: "",
        genero:  data.genero,
        celular:  data.celular,
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
                <TableCell align="center">Permiso</TableCell>
                <TableCell align="center">Pais</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Apellido</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Genero</TableCell>
                <TableCell align="center">Celular</TableCell>
                <TableCell align="center">Actualizar</TableCell>
                <TableCell align="center">Habilitado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataUsuarios &&
                dataUsuarios.map((row) => (
                  <TableRow key={row.idUsuarios}>

                    <TableCell style={{ display: "none" }} align="center">{row.idUsuarios}</TableCell>
                    <TableCell align="center">{row.NombreRol}</TableCell>
                    <TableCell align="center">{row.nombrePais}</TableCell>
                    <TableCell align="center">{row.nombre}</TableCell>
                    <TableCell align="center">{row.apellidos}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.genero}</TableCell>
                    <TableCell align="center">{row.celular}</TableCell>
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
                    {row.habilitado === 0 ? (
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDialog("habilitar", row.idUsuarios)}
                        >
                          <ClearIcon
                            style={{ color: red[700] }}
                            fontSize="small"
                          />
                        </IconButton>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDialog("desabilitar", row.idUsuarios)}
                        >
                          <CheckIcon
                            style={{ color: green[700] }}
                            fontSize="small"
                          />
                        </IconButton>
                      </TableCell>
                    )}
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