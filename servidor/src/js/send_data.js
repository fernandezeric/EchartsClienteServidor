/*
Crea una query para obtener los datos provenientos de la base de datos
el await es para esperar la respuesta y no saltar a la siguiente tarea que tenga nodejs
*/
const path = require('path');
const base = require(path.join(process.cwd(),'src/js/basedatos.js'));
var db = base.conectar();

module.exports.data_xy = async function( x, y, limit, offset){

    let request = "SELECT " + x + "," + y + " FROM objects LIMIT " + limit + " OFFSET " + offset
    let data = await db.many(request)
    return data
}