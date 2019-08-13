<template>
  <div id="app">
    <div class="main-map" id="lol">

    </div>

    <div class="tool-box">

      <p>position</p>
      <div>
        <button @click="addXYZ('x')">x+</button>
        <button @click="addXYZ('y')">y+</button>
        <button @click="addXYZ('z')">z+</button>
      </div>
      <div>
        <button @click="subXYZ('x')">x-</button>
        <button @click="subXYZ('y')">y-</button>
        <button @click="subXYZ('z')">z-</button>
      </div>

      <p>rotate</p>
      <div>
        <button @click="addRotate('x')">x+</button>
        <button @click="addRotate('y')">y+</button>
        <button @click="addRotate('z')">z+</button>
      </div>
      <div>
        <button @click="subRotate('x')">x-</button>
        <button @click="subRotate('y')">y-</button>
        <button @click="subRotate('z')">z-</button>
      </div>


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
      getTarget(){
        let target = myLoL.aimationBox[myLoL.aimationBox.length - 1]
        return target
      },

      addXYZ(type){
        let target = this.getTarget()
        let xyz = target.getXYZ()

        switch (type) {
          case 'x':
            xyz.x+=1
            break
          case 'y':
            xyz.y+=1
            break
          case 'z':
            xyz.z+=1
            break
        }

        target.changeXYZ(xyz.x, xyz.y, xyz.z)
        console.log(target.getXYZ())

      },

      subXYZ(type){
        let target = this.getTarget()
        let xyz = target.getXYZ()

        switch (type) {
          case 'x':
            xyz.x-=1
            break
          case 'y':
            xyz.y-=1
            break
          case 'z':
            xyz.z-=1
            break
        }

        target.changeXYZ(xyz.x, xyz.y, xyz.z)
        console.log(target.getXYZ())

      },

      addRotate(type){
        let target = this.getTarget()
        let xyz = target.getRotate()

        switch (type) {
          case 'x':
            xyz.x+=0.01
            break
          case 'y':
            xyz.y+=0.01
            break
          case 'z':
            xyz.z+=0.01
            break
        }

        target.changeRotate(xyz.x, xyz.y, xyz.z)
        console.log(target.getRotate())
      },


      subRotate(type){
        let target = this.getTarget()
        let xyz = target.getRotate()

        switch (type) {
          case 'x':
            xyz.x-=0.01
            break
          case 'y':
            xyz.y-=0.01
            break
          case 'z':
            xyz.z-=0.01
            break
        }

        target.changeRotate(xyz.x, xyz.y, xyz.z)
        console.log(target.getRotate())
      }
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

  .tool-box {
    width: 300px;
    background-color: rgba(0, 0, 0, .6);
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>
