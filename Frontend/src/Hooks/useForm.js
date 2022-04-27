import { useState } from "react";
import { helpHttpAxios } from "../Helpers/helpHttpsAxios";

const UseForm = (initialForm, validateForm) => {


  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,  //IMPORTATE: Esto hace: Coge lo que tenga inicial mente form, luego e.target.name hace referencia al name del imput que es igual a la llave del objeto form y le pasa el target.value dentro del setform para que lo actualice
    });
  };

  const handleChangechecked = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };

  const handleBlur = (e) => {
    handleChange(e); //Lama a handleChange para guardar los cambios de form
    setError(validateForm(form));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    handleChange(e);

    setError(validateForm(form));

    //Se valida que el objeto error venga vacio
    if (Object.keys(error).length === 0) {

      setLoading(true);

      let config = {
        'data': form
      };

      const res = await helpHttpAxios().post(URL, config)

      setLoading(false);

      if (!res.err) {
        setResponse(res.message)
        setTimeout(() => {
          setResponse(false);
        }, 5000)
      } else {
        let errores = { 'errores': res.message }
        setError(errores);
        setTimeout(() => {
          setError(false);
        }, 9000)
      }

    } else {
      return;
    }

  };



  return {
    form,
    setForm,
    error,
    setError,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
    handleChangechecked,
  };
};

export default UseForm;
