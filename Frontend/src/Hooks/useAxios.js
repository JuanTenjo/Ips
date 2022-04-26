import { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = (url) => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const abortController = new AbortController(); //Se hace para que vote un error por si el servidor esta caido
    const signal = abortController.signal; //Signal

    const axiosData = async () => { //Se hace una funcion asyns, ya que el hook UsseEFECT no debemos colocarlo async porque react dice que es un antipatron
      setLoading(true);//Se actualiza el estado a true

      try {


        const Logged = window.localStorage.getItem("LoggedAppUser");
        const token = JSON.parse(Logged);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        const res = await axios.get(url, config); 

        if (!signal.aborted) { //Si signal es false, se actualiza la data y el error se pasa a null
          setData(res.data);  //Se actualiza el estado de data con elj 
          setError(null);
        }
        
      } catch (err) {
        if(err.response){
          window.localStorage.removeItem('LoggedAppUser')
          setError(err.response.data);
          setTimeout(() => {
            setData(false);
          }, 3000);
        }
      }
    };

    axiosData();

    return () => abortController.abort();

  }, [url]);

  return { data, error, loading };

};