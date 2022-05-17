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
  

const TableConsulta = ({setdataToEdit,dataUsuarios,deleteData}) => {

    
    let classes = useStyle();
    
    const [open, setOpen] = useState(false);
    const [InfoDialog, SetInfoDialog] = useState(initalDialog);

    const handleUpdate = (data) => {

      const row = {
        idConsulta: data.idConsulta,
        idTipo: data.idTipo,
        idPaciente: data.idPaciente,
        idUsuario: data.idUsuario,
        idTipoformula: data.idTipoformula,
        horaIngreso: data.horaIngreso,
        horaSalida: data.horaSalida,
        peso: data.peso,
        estatura: data.estatura,
        sintomas: data.sintomas,
        descripcion: data.descripcion,
        asistio: (data.asistio === 0 ? false : true),
        fechaconsulta: data.fechaconsulta,
        examen1: data.examen1,
        examen2: data.examen2,
        examen3: data.examen3,
        valor: data.valor,
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
                <TableCell align="center">idConsulta</TableCell>
                <TableCell align="center">Tipo consulta</TableCell>
                <TableCell align="center">Paciente</TableCell>
                <TableCell align="center">Usuario</TableCell>
                <TableCell align="center">Formula</TableCell>
                <TableCell align="center">Peso</TableCell>
                <TableCell align="center">Estatura</TableCell>
                <TableCell align="center">Sintomas</TableCell>
                <TableCell align="center">Descripcion</TableCell>
                <TableCell align="center">Asistio</TableCell>
                <TableCell align="center">Fecha Consulta</TableCell>
                <TableCell align="center">Actualizar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataUsuarios &&
                dataUsuarios.map((row) => (
                  <TableRow key={row.idConsulta}>

                    <TableCell style={{ display: "none" }} align="center">{row.idConsulta}</TableCell>
                    <TableCell align="center">{row.idConsulta}</TableCell>
                    <TableCell align="center">{row.consulta}</TableCell>
                    <TableCell align="center">{row.nombre} {row.apellido}</TableCell>
                    <TableCell align="center">{row.username}</TableCell> 
                    <TableCell align="center">{row.formula}</TableCell>
                    <TableCell align="center">{row.peso}</TableCell>
                    <TableCell align="center">{row.estatura}</TableCell>
                    <TableCell align="center">{row.sintomas}</TableCell>
                    <TableCell align="center">{row.descripcion}</TableCell>
                    <TableCell align="center"> {Number(row.asistio) === 1 ? "SI" : "NO"}</TableCell>
                    <TableCell align="center">{row.fechaconsulta}</TableCell>
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
                          onClick={() => handleDialog("habilitar", row.idConsulta)}
                        >
                          <ClearIcon
                            style={{ color: red[700] }}
                            fontSize="small"
                          />
                        </IconButton>
                      </TableCell>
                    ) :null}
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

export default TableConsulta;