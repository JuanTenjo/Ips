//----------------------------------------Imports $ Require --------------------------------------------
const express = require("express")
const morgan = require("morgan") //ver todo los end poins que estamos requiriendo al usar la api
const cors = require("cors") //para hacer trasminitir recursos tanto en el frontend como en el backend
const bodyParser = require("body-parser") //Para hacer los submits
const path = require('path');
const passport = require('passport');
const passportMiddleware = require('./middlewares/passport.middleware');
const indexRoutes = require('./routes/index.route'); //Trae la routes
require('dotenv').config();
const {appConfig} = require('./config');
const app = express(); //instancias

//----------------------------------------Fin Import & Require -----------------------------------------

//------------------------------------------------ Inicio middleware -------------------------------------------------------

app.use(morgan('dev')); //Para observar que hacen las peticiones
app.use(bodyParser.json()); //Obtener datos json
app.use(express.json());
app.use(express.urlencoded({extended: true}));  //Permite leer los datos que viene por un formulario
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );
app.use(express.json());
passport.use(passportMiddleware);


//------------------------------------------------ Fin middleware -------------------------------------------------------

//------------------------------------------------ Inicio Configuraciones -----------------------------------------------

app.set('appName', 'IPS'); //De esta forma se crean variables
app.set('port', appConfig.port || 4000); //Asigna el puerto que venga en config y si esta ocupado asigneme otro

// app.use(express.static(path.join(__dirname, 'public')));  //Siempre nuestros directorio publico va a hacer public

app.use('/public', express.static(`${__dirname}/assets/images`));  //Para la ubicacion public siempre se van a utilizar los archivos estaticos en assets/images
//------------------------------------------------ Fin Configuraciones -----------------------------------------------

//------------------------------------------------ Routes -----------------------------------------------

app.use(indexRoutes);

//------------------------------------------------ Fin Routes -----------------------------------------------


app.listen(app.get("port"), () => {
    console.log(app.get('appName'));
    console.log('Aplicacion de IPS corriendo en el puerto '+ app.get("port"));
})  

