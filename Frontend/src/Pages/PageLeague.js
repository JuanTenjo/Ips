import React, { useState, useEffect } from "react";
import Loader from "../Components/Necesarios/Loader";
import Message from "../Components/Necesarios/Message";
import FormLeague from "../Components/LeagueComponent/FormLeague";
import TableLeague from "../Components/LeagueComponent/TableLeague";
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

const PageLeague = () => {
  let classes = useStyle();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState({});
  const [dataToEdit, setDataToEdit] = useState(false);
  const [dataLigas, setDataLigas] = useState(null);

  useEffect(() => {
    traerLigas();
  },[]);
  
  const traerLigas = async () => {
    setLoading(true);
    const data = await helpHttpAxios().get(`${API.URI}/league`);                                                                                                                         
    setDataLigas(data);
    setLoading(false);
  };


  const createData = async (data) => {
    setLoading(true);

    let URL = `${API.URI}/league/register`;

    let config = {
      data: data,
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

    traerLigas();

  };
  const updateData = async (data) => {
    setLoading(true);

    let URL = `${API.URI}/league/update`;

    let config = {
      data: data,
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

    traerLigas();
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

    traerLigas();

  };

  return (
    <div className={classes.content}>
      <div className={classes.toolbar}>
        <Grid container direction="row">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FormLeague
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
              <TableLeague
                dataLigas={dataLigas}
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

export default PageLeague;
