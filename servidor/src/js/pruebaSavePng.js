/*
Guarda una iamgen png proviente de la randerizacion del Canvas de Echarts en el servidor
*/
const path = require('path');
const db = require(path.join(process.cwd(),'src/js/basedatos.js'));
var conect = db.conectar();
const {JSDOM} = require('jsdom');
const fs = require('fs');

module.exports.prueba = async function (x,y,min_x,min_y,max_x,max_y,loop){
  console.log("../public/js/images")
  var base = 2500 // funciona como numero limite, un bug dado que no encuento aun como esperar más datos y que no falle zrender(arbol de Echarts)
  var limit = base
  var offset = base*loop
  var request = "SELECT " + x + "," + y + " FROM objects LIMIT " + limit + " OFFSET " + offset
  var option = {}
  await conect.many(request)
  .then(response => {
    console.log("1")
    let datas = []
    for(let i in response){
      datas.push(Object.values(response[i]))
    }
    option = {
      //animation: false,
      //large: true,
      // largeThreshold: 500,
      blendMode: 'lighter',
      // lazyUpdate: true,
      // progressive: 1e6,
      title: {
        text: "Prueba PNG",
        left: "center",
        textStyle: {
          fontWeight: "lighter"
        }
      },
      xAxis: {
        scale: true,
        name: x,
        type: "value",
      },
      yAxis: {
        scale: true,
        name: y,
        nameLocation: "start",
        type: "value",
      },
            
      series: [
        {
          symbolSize: 4,
          color: "#22d100", //  color: "#ff0000",
          type: 'scatter',
          data : datas         
        }
      ]
    }
    console.log("1.1")
    console.log("2")
    /*
    Aqui crea un canvas en el servidor y guarda la imagen en la ruta imgPath
    */
    var echarts = require('echarts');
    var canvas = require('canvas')
    let ctx = canvas.createCanvas(500,500)
    echarts.setCanvasCreator(()=>ctx)
    let chart = echarts.init(ctx)
    chart.setOption(option)
    const imgPath = __dirname+'/prueba2.png'
    fs.writeFileSync(imgPath,chart.getDom().toBuffer())
  })
  
  // var echarts = require("echarts");
  // const { createCanvas } = require('canvas')
  //funciona?, al parecer no esta esperando lo anterior
  // var echarts_node = require('node-echarts-canvas');
  // var config = {
  //   width: 500, // Image width, type is number.
  //   height: 500, // Image height, type is number.
  //   option: options, // Echarts configuration, type is Object.
  //   //If the path  is not set, return the Buffer of image.
  //   path:'/home/jonimott/Escritorio/servidor/src/public/images/asd.png', // Path is filepath of the image which will be created.
  //   enableAutoDispose: true  //Enable auto-dispose echarts after the image is created.
  // }
  // echarts_node(config)

}

/*
Necesito una funcion que espere a que el for esta listo y que las opciones totales esten seteadas
*/