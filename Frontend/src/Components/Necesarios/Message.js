import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: '30px',
    },
  },
}));

const Message = ({ msg, estado }) => {

  const classes = useStyles();

  // let styles = {
  //   padding: "0.03rem",
  //   marginBotton: "0.rem",
  //   color: "#fff",
  //   borderRadius: 8,
  //   fontWeight: "bold",
  //   backgroundColor: bgColor,
  //   textAling: "center",
  //   marginTop: '10px',
  //   marginRight: '5px',
  //   with: '100%',
  // };

  return (

      <div className={classes.root}>
        {estado ? <Alert  severity="success">{msg}</Alert> : <Alert severity="error">{msg}</Alert>}

        {/*Esta linea de abajo es para aplicar diseño desde donde se llama el componente*/}
        {/* <p dangerouslySetInnerHTML={{__html:msg}} /> */}

      </div>


  );
};

export default Message;
