/*
Aque se crea una canvas de Echarts del lado del servidor con los datos que se piden y los renderiza en un SVG
*/
const path = require('path');
const db = require(path.join(process.cwd(),'src/js/basedatos.js'));
var conect = db.conectar();
const echarts = require('echarts');
const Canvas = require('canvas');
const {JSDOM} = require('jsdom');
const fs = require('fs');

module.exports.prueba = async function (x,y,min_x,min_y,max_x,max_y,loop){
  
  echarts.setCanvasCreator(() => {
    return new Canvas.Canvas(100, 100);
  });

  const {window} = new JSDOM();
  global.window = window;
  global.navigator = window.navigator;
  global.document = window.document;
        
  const root = document.createElement('div');
  root.style.cssText = 'width: 500px; height: 500px;';
  //aca hay un problema de sincronia, arreglar -> pendiente 
  //no devuelve la misma forma con la misma consulta dao ese problema
  let base = 1000
  let limit = base
  let offset = base*loop
  let request = "SELECT " + x + "," + y + " FROM objects LIMIT " + limit + " OFFSET " + offset
  console.log(request)
  await conect.many(request)
  .then(data => {
    let ztf2 = []
    console.log(request)
    for(let i in data){
      ztf2.push(Object.values(data[i]))
    }
    console.log(ztf2.length)
    // console.log(ztf2)
    const chart2 = echarts.init(root, null, {
      renderer: 'svg'
    });
    console.log("setpOpton")
    chart2.setOption({
      title: {
        text: 'Prueba Tamaño',
        textStyle :{
          fontStyle : 'italic', //da lo mismo al parecer para el svg
          fontSize: 18,
        },
      },
      tooltip: {},
      legend: {
        data: []
      }, 
      xAxis: {
        name: x,
        nameLocation: "end",
        type: "value",
        min : min_x,
        max : max_x,
        // scale : true
      },
      yAxis: {
        name: y,
        nameLocation: "end",
        type: "value",
        min : min_y,
        max : max_y
        // scale : true
      },
      series: [{
        blendMode: 'lighter', // en svg no toma esto, lo toma en canvas :c
        animation: false,
        name: 'serie',
        type: 'scatter',
        data: ztf2
      }]
    });
    //let name = 'send.svg' 
    //console.log("write", ztf2.length)
    fs.writeFileSync('src/public/svg/send.svg', root.querySelector('svg').outerHTML, 'utf-8'); // guarda el canvas como svg
    console.log("close")
    chart2.dispose();
    })
}

 module.exports.prueba2 =async function(){
  const axios = require('axios');
  var arreglo_ZTF = []
  axios.post('http://dev.alerce.online:8085/get_sql', {
  "records_per_pages": 1,
  "page": 1,
      "query_parameters": {
          
      "filters" :{
          "oid":"ZTF18abbvavt",
          "nobs": {
              "min": 20
          }
          }
      },
  })
  .then(response => {
      arreglo_ZTF = response.data
      console.log(arreglo_ZTF)
  })
}



    // var parse = require('parse-svg-path')
    // var extract = require('extract-svg-path')
    
    // var path = extract(__dirname + '/basic2.svg')
    // var svg = parse(path)

    // console.log(svg)

    // return 1
    // const parseSVG = require('parse-svg')

    // var svgEle = parseSVG('<path d="M100,100 L150,100 L150,150  Z"  style="stroke: #0000cc; stroke-width: 2px;  fill: #ccccff;"/>');
    // console.log(svgEle)/aqui esta guardado el nuevo con toda la cosa
    // fs.readFile('/home/jonimott/Escritorio/PruebaServidor/express-locallibrary-tutorial/public/javascripts/basic2.svg', (err,data) => {
    //     console.log(data)
    //     console.log("ad")
    // })