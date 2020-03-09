/*
Crea una query para obtener los datos provenientos de la base de datos
el await es para esperar la respuesta y no saltar a la siguiente tarea que tenga nodejs
*/
const path = require('path');
const db = require(path.join(process.cwd(),'src/js/basedatos.js'));
var conect = db.conectar();
const fs = require('fs');

module.exports.prueba = async function(x,y,limit,offset){
  var request = "SELECT " + x + "," + y + " FROM objects LIMIT " + limit + " OFFSET " + offset
  let data = await conect.many(request)
  return data
}