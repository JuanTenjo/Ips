import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController(); //Se hace para que vote un error por si el servidor esta caido
    const signal = abortController.signal; //Signal

    const fetchData = async () => { //Se hace una funcion asyns, ya que el hook UsseEFECT no debemos colocarlo async porque react dice que es un antipatron
      setLoading(true);//Se actualiza el estado a true

      try {
        const res = await fetch(url, { signal }); //Se hace la peticion, y se le pasa signal para verificar si hubo respuesta del servidor

        if (!res.ok) { //Si res.ok es false
          let err = new Error("Error en la petición Fetch"); 
          err.status = res.status || "00";
          err.statusText = res.statusText || "Ocurrió un error";
          throw err; //Lanzamos un error objeto con un error si existe 
        }

        const json = await res.json(); //Cojemos la respuesa y la pasamos a json

        if (!signal.aborted) { //Si signal es false, se actualiza la data y el error se pasa a null
          setData(json);  //Se actualiza el estado de data con elj 
          setError(null);
        }
      } catch (error) {
        if (!signal.aborted) {
          setData(null);
          setError(error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, error, loading };
};