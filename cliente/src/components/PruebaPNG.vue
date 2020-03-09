<template>
  <div>
    <p>{{msg}}</p>
    <h2 id="botones"> Parametros </h2>
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
        <button @click="add">add</button>
      </li>
    </ul>
    <h2 id="subtext"></h2>
    <div>
      <img :src="'data:image/png;base64,${data}'" />
    </div>
  </div>
</template>

<script>
/*
Este metodo no esta terminado, falta arreglar como recibir una imagen png y actualizar el img de la pagina
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
    
    return {
      msg: 'Pruebas alfas cliente-servidor PNG',
      eje_x,
      eje_y,
      min_x,
      max_x,
      min_y,
      max_y,
      image: ''
    }
  },

  methods: {
    add () {
      axios.post('http://localhost:3000/pruebas/basic_prueba_png', {
        'x': this.eje_x,
        'y': this.eje_y,
        'min_x': this.min_x,
        'min_y': this.min_y,
        'max_x': this.max_x,
        'max_y': this.max_y,
        'loop': 1
      })
        .then(response => {
          console.log(response)
          this.image = response.data
        })
    }
  }
}
</script>
