/*
conecta a la base de datos de alerce con un usuario de solo lectora
*/
const pgp = require("pg-promise")(/*options*/);
const cn ={
    host: 'db.alerce.online',
    port: 5432,
    database: 'ztf_v2',
    user: 'alerceread',
    password: 'alerce2019'
}
const db = pgp(cn);

module.exports.conectar = function(){
    return  db;
}