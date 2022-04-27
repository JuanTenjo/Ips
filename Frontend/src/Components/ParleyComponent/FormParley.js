import React, { useState, useEffect } from "react";
import { helpHttpAxios } from "../../Helpers/helpHttpsAxios";
import TableCompetition from "./TableCompetition"
import { red } from "@material-ui/core/colors";
import API from "../../Utils/dominioBackend";
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from "@material-ui/lab/Alert";
import {
  Grid,
  makeStyles,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@material-ui/core";


const useStyle = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  boton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  Label: {
    textAlign: "center",
  }
}));


const FormParley = ({ dataToEdit, setDataToEdit, createData, updateData }) => {

  let classes = useStyle();
  const [cuotaTotal, setCuotaTotal] = useState("");
  const [idParley, setIdParley] = useState(null);
  const [dataCompetition, setDataCompetition] = useState(null);
  const [competitionSelect, setCompetitionSelect] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    const traerCompeticiones = async () => {
      const data = await helpHttpAxios().get(`${API.URI}/parley/teamAval`);
      setDataCompetition(data);
    };

    traerCompeticiones();

  }, []);


  useEffect(() => {
    if(dataToEdit){
      setIdParley(dataToEdit[0].idparleys);
      setCuotaTotal(dataToEdit[0].cuotaTotal);
      setCompetitionSelect(dataToEdit);

    }else{
      setIdParley(null);
      setCuotaTotal("");
      setCompetitionSelect([]);
    }
  }, [dataToEdit]);

  const handleSubmit = async (e) => {

    setError({});

    if(competitionSelect.length < 2){
      setError({
        "compeSelect": "Ingresa minimo dos competiciones para generar un parley",
      })
    }else{ 
      if(!cuotaTotal){
        setError({
          "cuotaTotal": "Ingresa el porcentaje del parley",
        })
      }else{ 
        
          if (Object.keys(error).length === 0) {
            
            if(idParley){

              let idCompetencias = [];
              idCompetencias = competitionSelect.map(function(element){
                return element.idCompeticiones;
              });


              const data = {
                "parley":idParley,
                "competencias": idCompetencias,
                "cuotaTotal": cuotaTotal,
              }

              updateData(data);

            }else{
              
              let idCompetencias = [];
              idCompetencias = competitionSelect.map(function(element){
                return element.idCompeticiones;
              });

              const data = {
                "competencias": idCompetencias,
                "cuotaTotal": cuotaTotal,
              }
            
              createData(data);

            }
          }
      }

    }


  }


  const addCompetitionParley = async (row) => {

    if(competitionSelect.length >= 1){
      
      let newData = competitionSelect.filter((el) => Number(el.idCompeticiones) === Number(row.idCompeticiones));

      if(newData.length >= 1){
        window.alert("Esta competicion ya existe en este Parley");  
        
      }else{
        
        if(competitionSelect.length >= 4){
          
          window.alert("Este parley ya tiene 4 competencias");
          
        }else{
          
          //DE ESTA FORMA UTILIZAMOS ... El operador de extensión de JavaScript ( …) ayuda al copiar y combinar matrices, por lo que también se puede usar para agregar un elemento a una matriz en el estado React.
          //Usar una función contenedora dentro de la función setter de React Hooks es una mejor solución que la implementación simplemente usando .concat() o ….
          // Jasper Dunn escribió en respuesta a este artículo sobre las ventajas de usar siempre una función contenedora cuando se trabaja con el estado React:
          // "El valor de las 'búsquedas' a las que se accede desde el enlace inicial puede ser diferente de lo esperado, y esto podría [causar] efectos secundarios no deseados". - Jasper Dunn
          // Se recomienda encarecidamente el uso de la función contenedora para que se acceda al estado actual cuando se produzca la re-renderización, no en otro momento.
          //La función contenedora también se denomina función de devolución de llamada , ya que se refiere a pasar una función a otra función.
  
          setCompetitionSelect(competitionSelect => [...competitionSelect, row]);
  
        }
  
      }

    }else{

      setCompetitionSelect(competitionSelect => [...competitionSelect, row]);

    }
    
  }

  const deleteCompetition = (idCompetition) => {

    let newData = competitionSelect.filter((el) => el.idCompeticiones !== idCompetition);

    setCompetitionSelect(newData)

  };

  const handleReset = () => {
    setIdParley(null);
    setCompetitionSelect([]);
    setDataToEdit(null);
  };

  const handleInputChange = (event) => {  
    setCuotaTotal(event.target.value);
  }

  return (
    <div>
      <Grid container justifyContent="center">
        <h3>{dataToEdit ? "Actualizar Parley" : "Ingresar Parley"}</h3>
      </Grid>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>

            <TableCompetition addCompetitionParley={addCompetitionParley} dataCompetition={dataCompetition}/>
       
          </Grid>
          <Grid item xs={6}>
          <h5>Competencias del parley</h5>
          {competitionSelect ?
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
                    <TableCell align="center">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {competitionSelect.map((row) => (
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
                            onClick={() => deleteCompetition(row.idCompeticiones)}
                          >
                            <DeleteIcon
                              style={{ color: red[700] }}
                              fontSize="small"
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          : <h5>Selecciona las competencias para agregar al parley</h5>}
          <Grid container  spacing={1}>
          <TextField
              required
              type="text"
              name="cuotaTotal"
              label="Porcentaje del parley"
              value={cuotaTotal}
              onChange={handleInputChange}
              className={classes.text}
              variant="outlined"
              size="small"
            />
          </Grid>
          </Grid>

        </Grid>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={handleReset}
              type="button"
              color="primary"
              className={classes.boton}
            >
              Limpiar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              type="button"
              onClick={handleSubmit}
              color="primary"
              className={classes.boton}
            >
              Enviar
            </Button>
            {error.compeSelect && (
              <Alert severity="warning">{error.compeSelect}</Alert>
            )}
            {error.cuotaTotal && (
              <Alert severity="warning">{error.cuotaTotal}</Alert>
            )}
          </Grid>
        </Grid>
    </div>
  );
};

export default FormParley;
