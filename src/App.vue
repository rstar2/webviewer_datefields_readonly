<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <WebViewer initialDoc="/data/date-fields.pdf"/>
    <!-- <WebViewer initialDoc="/data/form-1040.pdf"/> -->
  </div>
</template>

<script>
import WebViewer from './components/WebViewer.vue'

export default {
  name: 'App',
  components: {
    WebViewer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
