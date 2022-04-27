import React, { useState } from "react";
import { yellow } from "@material-ui/core/colors";
import UpdateIcon from "@material-ui/icons/Update";
import Message from "../../Components/Necesarios/Message";
import Dialogo from "../Necesarios/Dialogo";
import API from "../../Utils/dominioBackend";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";


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
  

const TableParley = ({setdataToEdit,dataparley,deleteData}) => {

    
    let classes = useStyle();
    
    const [open, setOpen] = useState(false);
    const [InfoDialog, SetInfoDialog] = useState(initalDialog);
    const [error, seterror] = useState(null);
    const handleUpdate = async (idParley) => {

      
      let config = {
        data: {"idParley":idParley},
      };

      const res = await helpHttpAxios().post(`${API.URI}/parley/detalleParley`,config);
      console.log(res);
      if (!res.err) {
        
        setdataToEdit(res);
        
      }else{
        seterror(res.message[0])

        setTimeout(() => {
          
          seterror(null)

        },4000)
      }

      //setdataToEdit(row);


    };

    const handleDialog = (operacion, ID) => {
        setOpen(!open);
        SetInfoDialog({
        tipo: "Parley",
        funcion: deleteData,
        operacion,
        ID,
        });
    };
    


    return (
        <Grid container justifyContent="center">
        <h3>Lista de parleys</h3>
        {error && <Message msg={error} estado={false} />}
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Num Parley</TableCell>
                <TableCell align="center">Fecha Parley</TableCell>
                <TableCell align="center">Cuota Total</TableCell>
                <TableCell align="center">Modificar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataparley &&
                dataparley.map((row) => (
                  <TableRow key={row.idparleys}>

                    <TableCell align="center">{row.idparleys}</TableCell>
                    <TableCell align="center">{row.fechaIngreso}</TableCell>
                    <TableCell align="center">{row.cuotaTotal}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="UpdateIcon"
                        onClick={() => handleUpdate(row.idparleys)}
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

export default TableParley;