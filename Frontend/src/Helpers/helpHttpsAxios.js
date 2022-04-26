import axios from "axios";

export const helpHttpAxios = () => {

  const customAxios = async (endpoint, options) => {

    const Logged = window.localStorage.getItem("LoggedAppUser");
    const token = JSON.parse(Logged);

    //define que por defaul se va a recibir un archivo json
    const defaultHeader = {
      accept: "application/json",
      Authorization: `Bearer ${token}`
    };

    //Agregamos la url

    options.url = endpoint;

    //Por si el servidor al que hacemos nuestra peticion esta caido
    const controller = new AbortController();
    options.signal = controller.signal;

    //si EL Objeto Option no trae un metodo, le colocarmos GET por defecto
    options.method = options.method || "GET";

    //Si trae options las combina con el default header especificado arriba, si no trae, solo le pasamos el default headers
    options.headers = options.headers
        ? { ...defaultHeader, ...options.headers }
        : defaultHeader;


    //Al body lo convertimos en cadena
   // options.data = JSON.stringify(options.data) || false;

    //Si no trae body, elimina la propiedad body del objeto options. delele elimina para eliminar algo dentro de un objeto
    if (!options.data) delete options.data;


    //Si despues de 5 segundo no se recibe respuesta del servidor, aplicamor abort que aborta la peticion
    setTimeout(() => controller.abort(), 7000);

    try {

      const res = await axios(options);
      return res.data;

    } catch (err) {
      if(err.response){
        return{
          err: true,
          status: err.status || "00",
          message: err.response.data.message || "Ocurrió un error",
        }
      }
    
    }


  };

  const get = (url, options = {}) => customAxios(url, options); //Si el objeto no pasa opciones le decimos que lleve un objeto vacio

  const post = (url, options = {}) => {
    options.method = 'POST';
    return customAxios(url, options);
  };

  const put = (url, options = {}) => {
    options.method = 'PUT';
    return customAxios(url, options);
  };

  const del = (url, options = {}) => {
    options.method = 'DELETE';
    return customAxios(url, options);
  };

  return { 
    get, 
    post, 
    put, 
    del,
  };

};

