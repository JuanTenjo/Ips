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

const TableTeam = ({ setdataToEdit,dataEquipos,deleteData}) => {
  let classes = useStyle();

  const [open, setOpen] = useState(false);
  const [InfoDialog, SetInfoDialog] = useState(initalDialog);

  const handleUpdate = (data) => {
    setdataToEdit(data);
  };

  const handleDialog = (operacion, ID) => {
    setOpen(!open);
    SetInfoDialog({
      tipo: "Equipo",
      funcion: deleteData,
      operacion,
      ID,
    });
  };

  return (
    <Grid container justifyContent="center">
      <h3>Lista de equipos</h3>
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
              <TableCell align="center">Liga</TableCell>
              <TableCell align="center">Equipo</TableCell>
              <TableCell align="center">Editar</TableCell>
              <TableCell align="center">Habilitado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataEquipos &&
                dataEquipos.map((row) => (
                <TableRow key={row.idEquipos}>
                  {/* <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell> */}
                  <TableCell style={{ display: "none" }} align="center">
                    {row.idEquipos}
                  </TableCell>
                  <TableCell align="center">{row.nombreLiga}</TableCell>
                  <TableCell align="center">{row.nombreEquipo}</TableCell>
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
                        onClick={() => handleDialog("habilitar", row.idEquipos)}
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
                        onClick={() => handleDialog("desabilitar", row.idEquipos)}
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
};

export default TableTeam;
