

// Servidor express
const express = require('express');
const cors = require('cors');

// Configuración global
require('./config/config');


// Base de datos
const mongoose = require('mongoose');

// Importamos rutas
const appFiles = require('./routes/files');

const app = express();

app.use(cors());
const bodyParser = require('body-parser');

// Middelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Rutas
app.get('/', ( req, res) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Bienvenido al backend del marco'
    });

});

app.use('/files', appFiles );


// Conexión a la base de datos
// conexión a la base de datos.
mongoose.connect( process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false

}, (err) => {
    if ( err )      
        throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'OnLine');
});

// Levantando el servidor

app.listen(process.env.PORT,  ()  =>  {
    console.log(`Servidor \x1b[32m%s\x1b[0m puerto ${process.env.PORT}`, 'ONLINE');
});


