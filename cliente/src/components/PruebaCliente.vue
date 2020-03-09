<template>
  <div>
    <p>{{msg}}</p>
    <div id="echarts">
      <v-chart autoresize ref="ref_echarts"/>
    </div>
     <h2 id="botones">Parametros</h2>
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
      </li>
      <li>
        Loops <input type="number" v-model="loops">
      </li>
      <li>
        <button @click="add">add_base(setting)</button>
        <button @click="data_api">data_api</button>
        <button @click="data_api_local">data_api_local</button>
      </li>
    </ul>
  </div>
</template>

<script>
/*
Prueba Renderizar todo del lado del Cliente utilizando Echarts
*/
import axios from 'axios'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'
import 'zrender/lib/svg/svg'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    let eje_x = 'meanra'
    let eje_y = 'meandec'
    let min_x = 0
    let max_x = 400
    let min_y = -40
    let max_y = 80
    let loops = 1
    return {
      msg: 'Prueba Echarts total cliente',
      eje_x,
      eje_y,
      min_x,
      max_x,
      min_y,
      max_y,
      loops
    }
  },

  methods: {
    /*
    Obteniendo los datos provenientes de la api de alerce 
    */
    data_api () {
      // PROBANDO FUNCION QUE AÑADE DATOS A UN SCATTER CREADO
      for (var i = 1; i <= this.loops; i++) {
        axios.post('http://dev.alerce.online:8085/query', {// https://ztf.alerce.online/query https://dev.alerce.online:8085/query -> utilizando la version de desarrollo
          'records_per_pages': 1000,
          'page': i,
          'query_parameters': {
            'filters': {
              'nobs': {
                'min': 20
              }
            }
          }
        }).then(response => {
          let aux = response.data.result
          let aux2 = []
          for (var i in aux) {
            aux2.push([ aux[i].meanra, aux[i].meandec ])
            // console.log(this.arreglo_ZTF[i].median_magpsf_r)
          }
          this.$refs.ref_echarts.appendData({
            seriesIndex: 0,
            data: aux2
          })
        })
      }
    },
    /*
    Obtiene los datos provenientes de la api local, es necesario que este corriendo el serverdir local
    */
    data_api_local () {
      axios.post('http://localhost:3000/pruebas/data_server', {
        'x': this.eje_x,
        'y': this.eje_y,
        'limit': 100000, // provando un limite 
        'offset': 0
      })
        .then(response => {
          console.log(response.data)
          let aux = []
          for (let i in response.data) {
            aux.push(Object.values(response.data[i]))
          }
          console.log(aux)
          this.$refs.ref_echarts.appendData({
            seriesIndex: 0,
            data: aux
          })
        })
    },
    /*
    Crea el chart del scatter como una funcion, al ser una prueba beta es necesario crear el canvas con los limites antes de añadir nueva data
    */
    add () {
      var opciones = {
        animation: false,
        large: true,
        // largeThreshold: 500,
        blendMode: 'lighter', // el efecto de cluster
        // lazyUpdate: true,
        // progressive: 1e6,
        postEffect: {
          enable: true
        },
        silent: true,
        title: {
          text: this.msg,
          left: 'center',
          textStyle: {
            fontWeight: 'lighter'
          }
        },
        xAxis: {
          // scale: true,
          name: this.eje_x,
          type: 'value',
          min: this.min_x,
          max: this.max_x
        },
        yAxis: {
          // scale: true,
          name: this.eje_y,
          // nameLocation: 'start',
          type: 'value',
          min: this.min_y,
          max: this.max_y
        },
        series: [{
          symbolSize: 5,
          color: '#22d100', //  color: "#ff0000",
          type: 'scatter'
        }]
      }
      this.$refs.ref_echarts.mergeOptions(opciones)
    }
  },
  mounted () {}
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
