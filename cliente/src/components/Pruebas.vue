<template>
<div>
    <div>
    <ul>
        <!-- <i>{{rawData_detection.length}}</i> -->
        <!-- <i>{{rawData_no_detection.length}}</i> -->
        <!-- <i>{{cambiar2}}</i> -->
        <i> <v-chart :options="opciones_scatter" 
                      autoresize 
                      class="ml-1" 
                      style="width:50%" 
                      ref="referencia"/> </i>
                      <!-- :init-options="initOptions"  -->
        <i><button v-on:click="bindData">Detecciones</button></i>
        <i><button v-on:click="bindData2">NoDetecciones</button></i>
        <i><button v-on:click="probandoFuncion2">Curvas</button></i>
        <i><button v-on:click="probandoFuncion3">AlgunaCosa</button></i>
        <!-- <i> <tr v-for="inf in info" v-bind:key="inf.candid" ></i> -->
        <!-- <i>{{arreglo_ZTF}}</i> -->
        <!-- <i>{{arreglo_ZTF_2}}</i> -->
    </ul>
    </div>
    <!-- <div> <v-chart ref="referencia"></v-chart></div> -->
</div>

</template>

<style>
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
</style>

<script>
/*
Diferentes funciones para ir provando todo
*/
import axios from 'axios'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

import 'echarts-gl'

export default {

  components: {
    'v-chart': ECharts
  },
  
  data () {

    let data1 = []

    let idx = 0
    let dataCount = 0
    let CHUNK_COUNT = 20

    let aux_largo = 0
    let limite = 10000

    let objetos = []
    let arreglo_ZTF = []
    let arreglo_ZTF_2 = []
    let arreglo_ZTF_3 = []

    return {
        rawData_detection: null,
        rawData_no_detection: null,
        arreglo_ZTF,
        arreglo_ZTF_2,
        arreglo_ZTF_3,


        opciones_scatter: {
            animation: false,
            large: true,
            // largeThreshold: 500,
            blendMode: 'lighter',
            // lazyUpdate: true,
            // progressive: 1e6,

            title: {
              text: "Aqui van a ir si o si las cosas",
              left: "center",
              textStyle: {
                fontWeight: "lighter"
              }
            },  
            // tooltip: {
                // trigger: 'item',
                // axisPointer: {
                  // type: 'cross'
              // }
            // },
            xAxis: {
              scale: true,
              name: "Julio Cesar",
              type: "value",
              min : 5800,//58000,
              max : 5900,//59000 
            },
            yAxis: {
              scale: true,
              name: "Magma",
              nameLocation: "start",
              type: "value",
              //inverse: true,
              min: 0,
              max: 25
              
            },
            
            series: [
                {
                    symbolSize: 5,
                    color: "#22d100", //  color: "#ff0000",
                    type: 'scatterGL',
                    data : data1
                 
                  }
            ]
        },
    }
  },

  mounted () {
    // this.$refs.referencia.showLoading()
    //this.bindData()
    //this.probandoFuncion()
   // this.probandoFuncion3()
    
  },

  watch:{
    
  },

  computed:{
  },

  methods:{
       bindData(){ 
         //detecciones base
          //this.$refs.referencia.showLoading();
          //this.$refs.referencia.hideLoading();
          axios.post('https://ztf.alerce.online/get_detections', {
                "oid":"ZTF18abbvavt"
            })
            .then(response => {
                this.rawData_detection = response.data.result.detections
                // this.cambiar = this.rawData.map(x => [x.magpsf, x.mjd])
                this.data1 = this.rawData_detection.map(function(x){
                  return [x.mjd, x.magpsf]
                })
                 this.$refs.referencia.appendData({
                     seriesIndex: 0,
                     data: this.data1
                })
                //  this.opciones_scatter.series[0].data = this.data1
                // this.arrayMagpsf = this.rawData.map(x => x.magpsf)
            })
            
      },
      bindData2() {    //para las no detecciones base
        this.$refs.referencia.showLoading();
        this.$refs.referencia.hideLoading();
        axios.post('https://ztf.alerce.online/get_non_detections', {
                "oid":"ZTF18abbvavt"
            })
            .then(response => {
                this.rawData_no_detection = response.data.result.non_detections
                // this.cambiar = this.rawData.map(x => [x.magpsf, x.mjd])
                this.data2 = this.rawData_no_detection.map(function(x){
                  if(x.diffmaglim > 0) return [x.mjd, x.diffmaglim]
                })
                // this.opciones_scatter.series[1].data = this.cambiar2
               // this.arrayMagpsf = this.rawData.map(x => x.magpsf)       
              // console.log(this.$refs)
               // console.log(this.$refs.$referencia)
              //  console.log(this.opciones_scatter.series[0].data.length)
                //  this.$refs.referencia.showLoading()
                this.$refs.referencia.appendData({
                     seriesIndex: 0,
                     data: this.data2
                })
              //  console.log(this.opciones_scatter.series[0].data.length)
            })
         // this.v-chart.appendData()
      },
      
      probandoFuncion(){
        //PRUEBA TERMINADA
        //if(this.idx >= this.CHUNK_COUNT){
        //  return
        //}
        //intentar con un while quizas? que va cambiando el oid,  que sea la funcion que recogue las cosas
          axios.post('https://ztf.alerce.online/query', {
                "records_per_pages": 100,
                "query_parameters": {
                  "filters" :{
                    "nobs": {
                      "min": 1000
                    }
                  }
              },
            })
            .then(response => {
                this.arreglo_ZTF = response.data.result

                for(var i in this.arreglo_ZTF){
                  this.arreglo_ZTF_2.push(i)
                }
            })
      },
      probandoFuncion3(){
        //PROBANDO FUNCION QUE AÑADE DATOS A UN SCATTER CREADO
        for(var i = 1; i <= 500; i++){
            // portquiz.net:8085
          axios.post('http://dev.alerce.online:8085/query', {//https://ztf.alerce.online/query //https://dev.alerce.online:8085/query
                "records_per_pages": 1000,
                "page": i,
                "query_parameters": {
                  "filters" :{
                    "nobs": {
                      "min": 20
                    }
                  }
              },
            })
            .then(response => {
                this.arreglo_ZTF = response.data.result

                for(var i in this.arreglo_ZTF){
                  this.arreglo_ZTF_2.push([this.arreglo_ZTF[i].median_magpsf_r,this.arreglo_ZTF[i].median_magpsf_g ])
                  // console.log(this.arreglo_ZTF[i].median_magpsf_r)
                }
                 this.$refs.referencia.appendData({ 
                     seriesIndex: 0,
                     data: this.arreglo_ZTF_2
                })
                this.arreglo_ZTF_2 = []
            })
        }
      },

      probandoFuncion2(){
        //PRUEBA QUE SOBREPONE CURVAS DE LUZ
        this.$refs.referencia.showLoading()
        this.$refs.referencia.hideLoading()
        // console.log("prueba2")
        // console.log(this.arreglo_ZTF_3)
        //arreglo todo cagon
        for(var i in this.arreglo_ZTF_2){
          axios.post('http://dev.alerce.online:8085/get_detections', {
                "oid": this.arreglo_ZTF_2[i]
            })
            .then(response => {
                this.rawData_detection = response.data.result.detections
                this.data1 = this.rawData_detection.map(function(x){
                  return [x.mjd, x.magpsf]
                })
                 this.$refs.referencia.appendData({ 
                     seriesIndex: 0,
                     data: this.data1
                })
            })
          // console.log(this.arreglo_ZTF_3[i])
         }
      },
 }
 


}
</script>