// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
// NODE_ENV variable que establece heroku

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Entorno
// ============================

let urlDB;

if ( process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/marco';

} else {

    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;