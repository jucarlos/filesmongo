const mongoose = require('mongoose');

// instalamos el plugin npm i mongoose-unique-validator
//const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ficheroSchema = new Schema({

    nombrecompleto: {
        type: String,
    },
    nombre: {
        type: String,
    },
    extension: {
        type: String,
    },
    contentType: {
        type: String,
    },
    tamanio: {
        type: Number,
    },
    data: {
        type: Buffer,
    }
   
});


module.exports = mongoose.model( 'Fichero', ficheroSchema );    


