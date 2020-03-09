const express = require('express');
const router = express.Router();
//const bodyParser = require('body-parser');
const tools = require('simple-svg-tools');
const path = require('path');
const multipart = require('connect-multiparty');
// process.cwd() o __dirname?
// ${variable} -> para poner dentro de un texto
const grafico = require(path.join(process.cwd(),'src/js/pruebaSave.js'));
const pruebaMerge = require(path.join(process.cwd(),'src/js/pruebaMerge.js'));
const pruebaPng = require('../js/pruebaSavePng.js')
const pruebaData = require('../js/pruebaData.js')

// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

//leer arhivos
const fs = require('fs');
//leer los json y parsearlos
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
//leer archivos que se env
router.use(multipart())

// //todo esto para que cualquiera pueda tener acceso a los datos
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

router.get('/pruebaMerge', async function(req, res, next) {

  await pruebaMerge.prueba()
  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(path.join(process.cwd(),'src/public/svg/final.svg'));
});

router.get('/data',async function(req,res,next){
    let data = await send_data.data_xy("meanra", "meandec", 10, 0)
    res.setHeader('Content-Type', 'application/json');
    res.json(data)
});

router.get('/basic_prueba_svg',async function(req,res,next){
  //await pruebaMerge.prueba()
  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(path.join(process.cwd(),'src/public/svg/final.svg'));
});

router.post('/basic_prueba_png',async function(req,res,next){
  const {x,y,min_x,min_y,max_x,max_y,loop} = req.body;
  console.log(x,y,min_x,min_y,max_x,max_y,loop)
  pruebaPng.prueba(x,y,min_x,min_y,max_x,max_y,loop)
  .then(()=> {
    console.log("jojojo")
    res.setHeader('Content-Type', 'image/png');
    res.sendFile('/home/jonimott/Escritorio/servidor/src/js/prueba2.png');
    // res.send("jojojo")
  })
  //res.setHeader('Content-Type', 'image/png');
 // res.sendFile(path.join(process.cwd(),'src/public/svg/final.svg'));
});

router.post('/data_server', async function(req,res,next){
  const {x,y,limit,offset} = req.body;
  console.log(x,y,limit,offset)
  let data = await pruebaData.prueba(x,y,limit,offset)
  res.setHeader('Content-Type', 'application/json');
  res.json(data)
});

router.post('/basic_prueba_svg', async function(req, res, next) {
  // console.log(req.params)
  // console.log(req.query)
  //console.log(req.body);
  const {x,y,min_x,min_y,max_x,max_y,loop} = req.body;
  console.log(x,y,min_x,min_y,max_x,max_y,loop)
  await grafico.prueba(x,y,min_x,min_y,max_x,max_y,loop)
    .then(()=>{
      console.log("grafico")
      tools.ImportSVG(path.join(process.cwd(),'src/public/svg/send.svg')).then(svg => {
        let aux = svg.getBody()
        res.send(aux) 
      })
    })
  // res.send("jojo")
//  res.setHeader('Content-Type', 'image/svg+xml');
  //res.sendFile('/home/jonimott/Escritorio/servidor/src/public/svg/send.svg');
});

router.post('/recibir',async function(req,res,next){
  // recibir usando stream, en particular crea uno nuevo, podria funcionar solo con el temporal
  // prueba pequeña funciono
  // manejar mejor las rutas
   console.log(req)
  //  var path_file = req.files.archivo.path
  //  console.log(path_file)
  //  var newPath_file = '/home/jonimott/Escritorio/servidor/src/public/svg/infinity.svg'//path.join(process.cwd(),'src/public/svg')//'carpetaArchivos'
  //  console.log(newPath_file)

  //  var is = fs.createReadStream(path_file)
  //  var os = fs.createWriteStream(newPath_file)

  //  is.pipe(os)

  //  is.on('end', function() {
  //     //eliminamos el archivo temporal -> muy buena vola
  //     fs.unlinkSync(path_file)
  //  })
   res.send('¡archivo subido!')

});

module.exports = router;
