export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    //define que por defaul se va a recibir un archivo json
    const defaultHeader = {
      accept: "application/json",
    };

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
    options.body = JSON.stringify(options.body) || false;

    //Si no trae body, elimina la propiedad body del objeto options. delele elimina para eliminar algo dentro de un objeto
    if (!options.body) delete options.body;


    //Si despues de 5 segundo no se recibe respuesta del servidor, aplicamor abort que aborta la peticion
    setTimeout(() => controller.abort(), 7000);

    return fetch(endpoint, options)
      .then((res) => 
        res.ok ? res.json() : Promise.reject({
            err: true,
            status: res.status || "00",
            statusText: res.statusText || "Ocurrió un error",
        })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options); //Si el objeto no pasa opciones le decimos que lleve un objeto vacio

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return { 
    get, 
    post, 
    put, 
    del,
    };
};

