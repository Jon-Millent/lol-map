<template>
  <div id="app">
    <div class="app-box">
      <div
        class="lol-box"
        ref="moveProject"
        :style="{
          left: position.map.x+'px',
          top: position.map.y+'px' ,
          perspectiveOrigin: getPerspectiveOrigin,
          transform: getTransform
        }">

        <div class="ground">
          <div class="x1-y1 bg-cover"></div>
          <div class="x1-y2 bg-cover"></div>
          <div class="x1-y3 bg-cover"></div>
          <div class="x1-y4 bg-cover"></div>
          <div class="x1-y5 bg-cover"></div>


          <div class="x2-y1 bg-cover"></div>
          <div class="x2-y2 bg-cover"></div>
          <div class="x2-y3 bg-cover"></div>
          <div class="x2-y4 bg-cover"></div>
          <div class="x2-y5 bg-cover"></div>


          <div class="x3-y1 bg-cover"></div>
          <div class="x3-y2 bg-cover"></div>
          <div class="x3-y3 bg-cover"></div>
          <div class="x3-y4 bg-cover"></div>
          <div class="x3-y5 bg-cover"></div>

          <div class="x4-y5 bg-cover"></div>
          <div class="x4-y4 bg-cover"></div>
          <div class="x4-y3 bg-cover"></div>
          <div class="x4-y2 bg-cover"></div>
          <div class="x4-y1 bg-cover"></div>


          <div class="x5-y1 bg-cover"></div>
          <div class="x5-y2 bg-cover"></div>
          <div class="x5-y3 bg-cover"></div>
          <div class="x5-y4 bg-cover"></div>
          <div class="x5-y5 bg-cover"></div>


        </div>


        <div class="obj">

        </div>

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
            x: -481,
            y: -4246,
            xPos: 0,
            yPos: 0
          }
        },
        maxTranslateZ: 600

      }
    },
    computed: {
      getPerspectiveOrigin(){
        return `${this.position.map.xPos*100}% ${this.position.map.yPos*100}%`
      },

      getTransform(){

        /*
        let xTargetPos = this.position.map.xPos * this.maxTranslateZ
        let yTargetPos = this.position.map.yPos * this.maxTranslateZ

        let z = this.position.map.xPos > this.position.map.yPos ? xTargetPos : yTargetPos
        */

        return `translateZ(-${this.maxTranslateZ}px) rotateX(10deg) rotateZ(-10deg)`
      }
    },
    methods: {
      onMoveChange(x, y, xPos, yPos){
        this.position.map.x = x
        this.position.map.y = y

        this.position.map.xPos = xPos
        this.position.map.yPos = yPos
      },
      DOMMouseScroll(e) {

        let value = e.wheelDelta;

        this.maxTranslateZ = value > 0 ? this.maxTranslateZ - 80 : this.maxTranslateZ + 80

      }
    },
    mounted() {

      let root = this

      this.$move = new Move(this.$refs.moveProject, {
        onChange(x, y, xPos, yPos){
          root.onMoveChange(x, y, xPos, yPos)
        },
        x: this.position.map.x,
        y: this.position.map.y
      })

      document.addEventListener('mousewheel', this.DOMMouseScroll.bind(this))

    },

  }
</script>

<style lang="scss">
  @import "~@/assets/scss/base.scss";
  @import "~@/assets/scss/map.scss";
</style>
