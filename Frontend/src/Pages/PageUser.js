import React, { useState, useEffect } from "react";
import FormUser from '../Components/UserComponent/FormUser';
import TableUser from '../Components/UserComponent/TableUser';
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


const PageUser = () => {

  let classes = useStyle();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState({});
  const [dataToEdit, setDataToEdit] = useState(false);
  const [dataUsuarios, setDataUsuarios] = useState(null);

  useEffect(() => {
    traerUsuarios();
  },[]);

  const traerUsuarios = async () => {
    setLoading(true);       
    const data = await helpHttpAxios().get(`${API.URI}/user`);                                                                                                                
    setDataUsuarios(data);
    setLoading(false);
  };

  const createData = async (data) => {
    setLoading(true);

    let URL = `${API.URI}/user/register`;

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

    traerUsuarios();

  };
  const updateData = async (data) => {
    setLoading(true);

    let URL = `${API.URI}/user/update`;

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

    traerUsuarios();

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

    traerUsuarios();

  };

  return (
    <div className={classes.content}>
      <div className={classes.toolbar}>

        <Grid container direction="row">

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

            <FormUser 
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
              <TableUser
                dataUsuarios={dataUsuarios}
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

export default PageUser;