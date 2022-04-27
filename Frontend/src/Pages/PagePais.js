import React, { useState, useEffect } from "react";
import Loader from "../Components/Necesarios/Loader";
import Message from "../Components/Necesarios/Message";
import FormPais from "../Components/PaisComponent/FormPais";
import TablePais from "../Components/PaisComponent/TablePais";
import { helpHttpAxios } from "../Helpers/helpHttpsAxios";
import API from "../Utils/dominioBackend";
import { makeStyles, Grid } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

const PagePais = () => {
  let classes = useStyle();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState({});
  const [dataToEdit, setDataToEdit] = useState(false);
  const [dataPais, setDataPais] = useState(null);
  const [file, setFile] = useState(null);


  useEffect(() => {
    traerPais();
  },[]);
  
  const traerPais = async () => {
    setLoading(true);
    const data = await helpHttpAxios().get(`${API.URI}/country`);                                                                                                                         
    setDataPais(data);
    setLoading(false);
  };


  const createData = async (datos) => {
    setLoading(true);

    const data = new FormData();
    data.append('codiPais', datos.codiPais);
    data.append('nombrePais', datos.nombrePais);

    if(file) {
      data.append('image', file[0], 'form-data');
    }

    let URL = `${API.URI}/country/Register`;


    let config = {
      data: data,
      headers: "Content-Type: multipart/form-data"
    };

    const res = await helpHttpAxios().post(URL, config);

    if (!res.err) {
      setResponse(res.message);
      setTimeout(() => {
        setResponse(false);
      }, 5000);
    } else {
      let errores = { errores: res.message };
      setError(errores);
      setTimeout(() => {
        setError(false);
      }, 9000);
    }

    setLoading(false);

    traerPais();

  };

  const updateData = async (datos) => {

    setLoading(true);

    const data = new FormData();
    data.append('codiPais', datos.codiPais);
    data.append('nombrePais', datos.nombrePais);

    if(file) {
      data.append('image', file[0], 'form-data');
    }


    let URL = `${API.URI}/country/Update`;


    let config = {
      data: data,
      headers: "Content-Type: multipart/form-data"
    };

    const res = await helpHttpAxios().put(URL, config);

    if (!res.err) {
      setResponse(res.message);
      setTimeout(() => {
        setResponse(false);
      }, 5000);
    } else {
      let errores = { errores: res.message };
      setError(errores);
      setTimeout(() => {
        setError(false);
      }, 9000);
    }

    setLoading(false);

    traerPais();
  };

  const deleteData = async (idLigas) => {

    setLoading(true);

    let URL = `${API.URI}/league/delete`;

    let config = {
      data: {'idLigas':idLigas},
    };

    const res = await helpHttpAxios().del(URL, config);

    if (!res.err) {
      setResponse(res.message);
      setTimeout(() => {
        setResponse(false);
      }, 5000);
    } else {
      let errores = { errores: res.message };
      setError(errores);
      setTimeout(() => {
        setError(false);
      }, 9000);
    }

    setLoading(false);

    traerPais();

  };

  return (
    <div className={classes.content}>
      <div className={classes.toolbar}>
        <Grid container direction="row">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormPais
              setFile={setFile}
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
            />

            {error.errores &&
              error.errores.map((el) => {
                return <Message key={el} msg={el} estado={false} />;
              })}

            {response && <Message msg={response} estado={true} />}

          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {loading ? (
              <Loader />
            ) : (
              <TablePais
                dataPais={dataPais}
                setdataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PagePais;
