class Move {

  constructor(element, config) {
    this.element = element;

    this.database = {
      x: 0,
      y: 0,

      tapX: 0,
      tapY: 0,

      moveX: 0,
      moveY: 0
    }

    this.statusBox = {
      isTouched: false
    }

    this.config = Object.assign({
      onChange(){

      }
    }, config)


    this.init()
  }


  init(){

    this.addEvent();
  }

  addEvent(){
    document.addEventListener('mousedown', this.mouseDownEvent.bind(this))
    document.addEventListener('mousemove', this.mouseMoveEvent.bind(this))
    document.addEventListener('mouseup', this.mouseUpEvent.bind(this))
  }

  mouseDownEvent(e){

    this.statusBox.isTouched = true

    this.database.tapX = e.clientX
    this.database.tapY = e.clientY

  }

  mouseMoveEvent(e){

    if(this.statusBox.isTouched) {

      let moveX = e.clientX - this.database.tapX
      let moveY = e.clientY - this.database.tapY

      this.database.moveX = moveX + this.database.x
      this.database.moveY = moveY + this.database.y

      // 边界限定

      /*
      if(this.database.moveX > 0) {
        this.database.moveX = 0
      } else if(this.database.moveX < -(this.element.offsetWidth - document.documentElement.clientWidth)) {
        this.database.moveX = -(this.element.offsetWidth - document.documentElement.clientWidth)
      }


      if(this.database.moveY > 0) {
        this.database.moveY = 0
      } else if(this.database.moveY < -(this.element.offsetHeight - document.documentElement.clientHeight)) {
        this.database.moveY = -(this.element.offsetHeight - document.documentElement.clientHeight)
      }
      */

      let xPoss = Math.abs(this.database.moveX) / Math.abs(this.element.offsetWidth - document.documentElement.clientWidth)
      let yPoss = Math.abs(this.database.moveY) / Math.abs(this.element.offsetHeight - document.documentElement.clientHeight)


      this.config.onChange(this.database.moveX, this.database.moveY, xPoss, yPoss)

    }

  }

  mouseUpEvent(){
    this.statusBox.isTouched = false

    this.database.x = this.database.moveX
    this.database.y = this.database.moveY
  }


}


export default Move