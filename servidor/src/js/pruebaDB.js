
module.exports.raw_db = function (){
        const conect = require('/home/jonimott/Escritorio/PruebaServidor/express-locallibrary-tutorial/public/javascripts/basedatos')
        var db = conect.conectar()
        db.many("SELECT oid, median_magap_g,  median_magap_r FROM objects LIMIT 100", []) //forma rasca de limitar
            .then(function (data) {
            console.log("DATA:", data[5]);
            //console.log(uno);
            //return data
            //console.log("DATA:", raw);
        })
            .catch(function (error) {
            //console.log("ERROR:", error);
        });
}