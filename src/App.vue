<template>
  <div id="app">
    <div class="main-map" id="lol">

    </div>
  </div>
</template>

<script>

  import LoL from './util/lol'

  let myLoL = null;


  export default {
    name: 'app',
    data(){
      return {
      }
    },
    computed: {

    },
    methods: {

    },
    mounted() {
      let el = document.getElementById('lol')

      myLoL = new LoL(el)
      myLoL.init()

    },

  }
</script>

<style lang="scss">
  @import "~@/assets/scss/base.scss";
  @import "~@/assets/scss/map.scss";
</style>
