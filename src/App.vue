<template>
  <div id="app">
    <div class="app-box">
      <div
        class="lol-box"
        ref="moveProject"
        :style="{
          left: position.map.x+'px',
          top: position.map.y+'px' ,
          perspectiveOrigin: getPerspectiveOrigin
        }">

      </div>
    </div>
  </div>
</template>

<script>
  import Move from './util/move'



  export default {
    name: 'app',
    data(){
      return {
        $move: null,

        position: {
          map: {
            x: 0,
            y: 0,
            xPos: 0,
            yPos: 0
          }
        }

      }
    },
    computed: {
      getPerspectiveOrigin(){
        return `${this.position.map.xPos*100}% ${this.position.map.yPos*100}%`
      }
    },
    methods: {
      onMoveChange(x, y, xPos, yPos){
        this.position.map.x = x
        this.position.map.y = y

        this.position.map.xPos = xPos
        this.position.map.yPos = yPos
      }
    },
    mounted() {

      let root = this

      this.$move = new Move(this.$refs.moveProject, {
        onChange(x, y, xPos, yPos){
          root.onMoveChange(x, y, xPos, yPos)
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/base.scss";
  @import "assets/scss/map.scss";
</style>
