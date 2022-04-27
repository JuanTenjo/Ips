import React, { useState, useEffect } from "react";
import FormParley from '../Components/ParleyComponent/FormParley';
import TableParley from '../Components/ParleyComponent/TableParley';
import Loader from "../Components/Necesarios/Loader";
import Message from "../Components/Necesarios/Message";
import { makeStyles, Grid } from "@material-ui/core";
import API from "../Utils/dominioBackend";
import { helpHttpAxios } from "../Helpers/helpHttpsAxios";

const useStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));


const PageParley = () => {

  let classes = useStyle();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState({});
  const [dataToEdit, setDataToEdit] = useState(false);
  const [dataparley, setDataparley] = useState(null);

  useEffect(() => {
    traerParleys();
  },[]);

  const traerParleys = async () => {
    setLoading(true);       
    const data = await helpHttpAxios().get(`${API.URI}/parley`);                                                                                                                
    setDataparley(data);
    setLoading(false);
  };

  const createData = async (data) => {
    setLoading(true);

    let URL = `${API.URI}/parley/register`;

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

    traerParleys();

  };
  
  const updateData = async (data) => {
    setLoading(true);

    let URL = `${API.URI}/parley/update`;

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
      console.log(res);
      let errores = { errores: res.message };
      console.log(errores);
      setError(errores);
      setTimeout(() => {
        setError(false);
      }, 9000);
    }

    setLoading(false);

    traerParleys();

  };

  const deleteData = async (idUsuarios) => {

    setLoading(true);

    let URL = `${API.URI}/user/delete`;

    let config = {
      data: {'idUsuarios':idUsuarios},
    };

    const res = await helpHttpAxios().del(URL, config);

    if (!res.err) {
      setResponse(res.message);
      setTimeout(() => {
        setResponse(false);
      }, 5000);
    } else {
      console.log(res);
      let errores = { errores: res.message };
      console.log(errores);
      setError(errores);
      setTimeout(() => {
        setError(false);
      }, 9000);
    }

    setLoading(false);

    traerParleys();

  };

  return (
    <div className={classes.content}>
      <div className={classes.toolbar}>

        <Grid container direction="row">

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

            <FormParley 
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
              <TableParley
                dataparley={dataparley}
                setdataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );


}

export default PageParley;