## Servicio, para poder guardar ficheros en mongo

Para probar con Postman, seguimos estos pasos.

#POST

En el post, hay que poner en el body que sea multipart/form-data
y el campo del fichero se tiene que llamar filereq.

No se puede subir un fichero de mas de 15Mb


#GET de todos los documentos
Si en postman pones host/files,
te devuelve una lista con todos los documentos que se han subido.
Esto está hecho con un fin de prueba. Este servicio no debería estar en un entorno de producción, creo.


#GET de un documento
En el get, hay que poner host/files/iddemongo
