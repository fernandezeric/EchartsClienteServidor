<template>
<div>
  <p>{{msg}}</p>
  <h2 id="datas">Parametros</h2>
  <h2 id="botones"> </h2>
    <ul>
      <li>
        Eje X <input type="text" v-model="eje_x">
      </li>
      <li>
        Eje Y <input type="text" v-model="eje_y">
      </li>
      <li>
        Min X <input type="number" v-model="min_x">
      </li>
      <li>
        Max X <input type="number" v-model="max_x">
      </li>
      <li>
        Min Y <input type="number" v-model="min_y">
      </li>
      <li>
        Max Y <input type="number" v-model="max_y">
        <!-- {{max_y}} -->
      </li>
      <li>
        loops <input type="number" v-model="loops">
        <!-- {{max_y}} -->
      </li>
      <li>
        <button @click="add">add</button>
      </li>
    </ul>
    <h2 id="seccion_svg"></h2>
    <div id="svg_aqui">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full"  width="600" height="600">
        <!-- <path d="M 50 440.5 L 450 440.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50 345.5 L 450 345.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50 250.5 L 450 250.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50 155.5 L 450 155.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50 60.5 L 450 60.5" fill="none" stroke="#ccc" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50.5 440 L 50.5 60" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50 440.5 L 450 440.5" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50 440.5 L 45 440.5" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50 345.5 L 45 345.5" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50 250.5 L 45 250.5" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50 155.5 L 45 155.5" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50 60.5 L 45 60.5" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 50.5 440 L 50.5 445" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 116.5 440 L 116.5 445" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 183.5 440 L 183.5 445" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 250.5 440 L 250.5 445" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 316.5 440 L 316.5 445" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 383.5 440 L 383.5 445" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><path d="M 450.5 440 L 450.5 445" fill="none" stroke="#333" stroke-width="1" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="none"></path><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,42,440)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="end" x="0" y="0">0</tspan></text><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,42,345)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="end" x="0" y="0">10</tspan></text><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,42,250)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="end" x="0" y="0">20</tspan></text><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,42,155)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="end" x="0" y="0">30</tspan></text><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,2.4492937051703357e-16,-2.4492937051703357e-16,1,42,60)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="end" x="0" y="0">40</tspan></text><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,0,0,1,83.33332824707031,448)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="middle" x="0" y="6">衬衫</tspan></text><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,0,0,1,150,448)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="middle" x="0" y="6">羊毛衫</tspan></text><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,0,0,1,216.6666717529297,448)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="middle" x="0" y="6">雪纺衫</tspan></text><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,0,0,1,283.33331298828125,448)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="middle" x="0" y="6">裤子</tspan></text><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,0,0,1,350,448)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="middle" x="0" y="6">高跟鞋</tspan></text><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,0,0,1,416.6666564941406,448)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="middle" x="0" y="6">袜子</tspan></text><path d="M 56.6667 440 L 110 440 L 110 392.5 L 56.6667 392.5 L 56.6667 440 Z" fill="#c23531" fill-opacity="undefined" stroke="none" clip-path="none"></path><path d="M 123.3333 440 L 176.6666 440 L 176.6666 250 L 123.3333 250 L 123.3333 440 Z" fill="#c23531" fill-opacity="undefined" stroke="none" clip-path="none"></path><path d="M 190 440 L 243.3333 440 L 243.3333 98 L 190 98 L 190 440 Z" fill="#c23531" fill-opacity="undefined" stroke="none" clip-path="none"></path><path d="M 256.6667 440 L 310 440 L 310 345 L 256.6667 345 L 256.6667 440 Z" fill="#c23531" fill-opacity="undefined" stroke="none" clip-path="none"></path><path d="M 323.3333 440 L 376.6666 440 L 376.6666 345 L 323.3333 345 L 323.3333 440 Z" fill="#c23531" fill-opacity="undefined" stroke="none" clip-path="none"></path><path d="M 390 440 L 443.3333 440 L 443.3333 250 L 390 250 L 390 440 Z" fill="#c23531" fill-opacity="undefined" stroke="none" clip-path="none"></path><path d="M -5 -5 L 59 -5 L 59 19 L -5 19 L -5 -5 Z" fill="rgba(0,0,0,0)" fill-opacity="1" stroke="#ccc" stroke-width="0" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" transform="matrix(1,0,0,1,223,5)" clip-path="none"></path><path d="M 3.5 0 L 21.5 0 A 3.5 3.5 0 0 1 25 3.5 L 25 10.5 A 3.5 3.5 0 0 1 21.5 14 L 3.5 14 A 3.5 3.5 0 0 1 0 10.5 L 0 3.5 A 3.5 3.5 0 0 1 3.5 0 Z" fill="#c23531" fill-opacity="1" stroke="none" transform="matrix(1,0,0,1,223,5)" clip-path="none"></path><text style="font: sans-serif 12px normal normal normal 12px;" transform="matrix(1,0,0,1,223,5)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="start" x="30" y="7">销量</tspan></text><path fill="rgba(0,0,0,0)" fill-opacity="1" stroke="#ccc" stroke-width="0" paint-order="fill" stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" transform="matrix(1,0,0,1,5,5)" clip-path="none"></path><text style="font: sans-serif 18px normal normal bolder 18px;" transform="matrix(1,0,0,1,5,5)" fill="#333" fill-opacity="1" stroke="none" clip-path="none"><tspan dominant-baseline="middle" text-anchor="start" x="0" y="9">ECharts 入门示例</tspan></text> -->
      </svg>
    </div>
</div>
</template>

<script>
/*
Sobrepone los svg
*/
import axios from 'axios'

export default {

  data () {
    var eje_x = 'meanra'
    var eje_y = 'meandec'
    var min_x = 0
    var max_x = 400
    var min_y = -40
    var max_y = 80
    var loops = 0

    return {
      msg: 'Pruebas alfas cliente-servidor SVG',
      eje_x,
      eje_y,
      min_x,
      max_x,
      min_y,
      max_y,
      loops
    }
  },

  mounted () {
  },

  watch: {
  },

  computed: {
    // ejex_invertido(){
    //   return this.ejex_final.split('').reverse().join('')
    // }
    /*
    retorna algo, cuando cambia alguna cosa de las que esta computando
    cambia automaticamente
    */
  },

  methods: {
    receive () {
      //prueba unica, para comprobar funcionalidades
      axios.get('http://localhost:3000/pruebas/basic')
        .then(response => {
          console.log(response.data)
          this.svgg = response.data
        // document.getElementsByTagName('svg')[0] = response.data
        })
    },

    add () {
      /*
      Funcion que añade en forma de loops nuevos svg, principalmente pide el svg 
      */
      for (let i = 0; i < this.loops; i++) {
        axios.post('http://localhost:3000/pruebas/basic_prueba_svg', {
          'x': this.eje_x,
          'y': this.eje_y,
          'min_x': this.min_x,
          'min_y': this.min_y,
          'max_x': this.max_x,
          'max_y': this.max_y,
          'loop': i // itaracion
        }).then(responde => {
          let aux = responde.data
          console.log(aux)
          document.getElementsByTagName('svg')[0].innerHTML += aux // añade los path que se reciben al svg existente
          /*
          un problema de lo anterior que aun no se parceaban bien los path y se repiten los textos
          queda pendiente arreglar eso en el servidor
          */
          // console.log(document.getElementsByTagName('svg')[0].innerHTML)
        })
      }
    }
  }
}
</script>

<style scoped>

/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
    margin: auto;
    width: 100%;
    height: 100%;
    min-height: 350px;
}

h1, h2 {
  font-weight: normal;
}
</style>
