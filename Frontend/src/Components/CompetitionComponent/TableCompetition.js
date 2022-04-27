import React, { useState } from "react";
import { yellow, red, green } from "@material-ui/core/colors";
import UpdateIcon from "@material-ui/icons/Update";
import ClearIcon from "@material-ui/icons/Clear";
import Dialogo from "../Necesarios/Dialogo";
import CheckIcon from "@material-ui/icons/Check";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";
import API from "../../Utils/dominioBackend";

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
  

const TableCompetition = ({setdataToEdit,dataCompetition,deleteData}) => {

    
    let classes = useStyle();
    
    const [open, setOpen] = useState(false);
    const [InfoDialog, SetInfoDialog] = useState(initalDialog);

    const handleUpdate = async (data) => {

      let IDCompetencia = data.idCompeticiones;

      const DetalleCompetencia = await helpHttpAxios().get(
        `${API.URI}/competition/detalleCompetencia/${IDCompetencia}`
      );
      

      const row = {
        codiPaisLocal: data.codiPaisLocal,
        codiPaisVisi: data.codiPaisVisi,
        idCompeticiones: IDCompetencia,
        idLigaLocal: data.idLigaLocal.toString(),
        idLigaVisitante: data.idLigaVisitante.toString(),
        idEquipoLocal: data.idEquipoLocal.toString(),
        idEquipoVisitante: data.idEquipoVisitante.toString(),
        golesLocal: data.golesLocal.toString(),
        golesVisitante: data.golesVisitante.toString(),
        fechaCompeticion: data.fechaCompeticion,
        horaCompeticion: data.horaCompeticion,
        habiliParley: data.habiliParley,
        estrategias: DetalleCompetencia,
      };
      
      setdataToEdit(row);

    };

    const handleDialog = (operacion, ID) => {
        setOpen(!open);
        SetInfoDialog({
        tipo: "Competicion",
        funcion: deleteData,
        operacion,
        ID,
        });
    };
    


    return (
        <Grid container justifyContent="center">
        <h3>Lista de Competiciones</h3>
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
                <TableCell align="center">Equipo Local</TableCell>
                <TableCell align="center">Liga</TableCell>
                <TableCell align="center">Equipo Visitante</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Hora</TableCell>
                <TableCell align="center">Gol Local</TableCell>
                <TableCell align="center">Gol Visi</TableCell>
                <TableCell align="center">Act</TableCell>
                <TableCell align="center">habilitado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataCompetition &&
                dataCompetition.map((row) => (
                  <TableRow key={row.idCompeticiones}>

                    <TableCell style={{ display: "none" }} align="center">{row.idCompeticiones}</TableCell>
                    <TableCell align="center">{row.ligaLocal}</TableCell>
                    <TableCell align="center">{row.equipoLocal}</TableCell>
                    <TableCell align="center">{row.ligaVisitante}</TableCell>
                    <TableCell align="center">{row.equipoVisitante}</TableCell>
                    <TableCell align="center">{row.fechaCompeticion}</TableCell>
                    <TableCell align="center">{row.horaCompeticion}</TableCell>
                    <TableCell align="center">{row.golesLocal}</TableCell>
                    <TableCell align="center">{row.golesVisitante}</TableCell>
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
                          onClick={() => handleDialog("habilitar", row.idCompeticiones)}
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
                          onClick={() => handleDialog("Eliminar", row.idCompeticiones)}
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

export default TableCompetition;