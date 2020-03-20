const express = require('express');


const app = express();
const path = require('path');
const fs = require('fs');

const multer = require('multer');


const Fichero = require('../models/fichero');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
  
const upload = multer({ storage: storage })


app.get('/', ( req, res ) => {

    Fichero.find( {},'nombre nombrecompleto tamanio')
    .exec( ( err, ficherosDB ) => {

        if ( err ) {
            return  res.status(400).json({
                ok: false,
                mensaje: 'Error al buscar el fichero',
                id,
            });
        }
        return res.status(200).json({
            ok: true,
            ficheros: ficherosDB
        });


    });
});


app.get('/:id', ( req, res ) => {

    const id = req.params.id || '';

    if ( id.length < 2 ) {
        return res.status(200).json({
            ok: false,
            mensaje: 'No se ha enviado un id',
            id,
        });
    }

    Fichero.findById( id, ( err, ficheroDB ) => {

        if ( err ) {
            return  res.status(400).json({
                ok: false,
                mensaje: 'Error al buscar el fichero',
                id,
            });
        }

        res.contentType(ficheroDB.contentType);
        res.send(ficheroDB.data);

        // return res.status(200).json({
        //     nombre: ficheroDB.nombrecompleto,
        // });

    });
});


app.post('/',  upload.single('filereq'), (req, res) => {
    
    // Obtener nombre del archivo
    const archivo = req.file;
    const nombreCortado = archivo.originalname.split('.');
  
    var file = fs.readFileSync(req.file.path);
    var encodeFile = file.toString('base64');
 // Define a JSONobject for the image attributes for saving to database
 
    const fichero = new Fichero({
        nombrecompleto : archivo.originalname,
        nombre         : nombreCortado[0]    ,
        extension      : nombreCortado[1],
        contentType    : archivo.mimetype,
        tamanio        : archivo.size,
        data: new Buffer.from( encodeFile, 'base64')
    });

   
    fichero.save( ( err, ficheroDb ) => {

        if ( err ) {

            borrarAnterior(archivo.path);

            return res.status(500).json({
                ok: false,
                error: err
            })

        } 
        borrarAnterior(archivo.path);   
       
        
        return res.status(200).json({
            ok: true,
            id: ficheroDb._id,
            nombre: ficheroDb.nombrecompleto,
            //data: ficheroDb.data,
        }); 
    });
    
});


borrarAnterior =  ( pathArchivo  ) => {
 // hay que borrar el que está en el directorio
 const pathViejo = path.resolve(__dirname, `../../${pathArchivo}`);

 // Si existe, elimina la imagen anterior
 if (fs.existsSync(pathViejo)) {
     
      fs.unlink(pathViejo, (err) => {
          if (err) return;
      });
 } 

    
}


module.exports = app;