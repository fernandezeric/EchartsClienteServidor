<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
       <router-link to="/">Home</router-link>
       <router-link to="/svg">PruebaSVG</router-link>
       <router-link to="/png">PruebaPNG</router-link>
        <router-link to="/cliente">PruebaCliente</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
</style>
