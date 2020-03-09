/*
Una prueba para realizar el Merge entre dos SVG, fuciona los path de cada uno
problema porque se deben parsear que no se repitan los textos
*/
const path = require('path');
const fs = require('fs');
const tools = require('simple-svg-tools');

module.exports.prueba = async function (){
  //QUE COSA MAS ORDINARIA HE HECHO DIOS MIO, cosas mas ordinarias en otros lados 
  tools.ImportSVG(path.join(process.cwd(),'src/public/svg/basic1.svg')).then(svg => {
    tools.ImportSVG(path.join(process.cwd(),'src/public/svg/basic2.svg')).then(svg2 =>{
      //console.log(svg.getBody())
      //console.log(svg2.getBody())
      var aux = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" style="user-select: none; position: absolute; left: 0px; top: 0px;" width="600" height="600">'
        + svg.getBody() + svg2.getBody() + '</svg>'
      //console.log(aux)
      /*
      pedir -> guardar en 1
              juntar con 2 
              guardar el final en 2
      <- enviar 2
      */
      fs.writeFileSync(path.join(process.cwd(),'src/public/svg/final.svg'), aux, 'utf-8');
      })
      .catch(err2 =>{
          console.log(err2)
       })
    }).catch(err => {
        console.log(err);
    });
}