
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'
import Stats from 'stats-js'


import Tower from './elements/tower'


import groundConfig from '../config/ground'

class LoL {

  constructor(el){
    this.$scene = null;
    this.$camera = null;
    this.$renderer = null;
    this.$controls = null;

    this.$plane = null;

    this.$el = el
    this.$stats = null


    this.aimationBox = []
  }

  init(){

    this.$scene = new THREE.Scene();
    this.$camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
    this.$camera.position.set(3, 1600, 5);
    this.$camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.$scene.add(this.$camera);



    this.addGround()
    this.render()
    this.controller()
    this.initStats()

    this.addTower()
    this.addLight()

    this.animate()

  }


  addLight(){

    let ambientLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );;

    // Add light element to the space
    this.$scene.add(ambientLight);
  }

  // 添加地面
  addGround(){
    let geometry = new THREE.PlaneGeometry(1000, 1000, 1);
    let material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
    let plane = this.$plane = new THREE.Mesh(geometry, material);


    plane.translateY(-0.5);
    plane.rotateX(-Math.PI / 2);

    groundConfig.forEach(val=>{

      // 测试添加贴图
      let url = val.url
      let texture = new THREE.Texture();
      let imgLoader = new THREE.ImageLoader();
      imgLoader.load(url,function(img){
        //将图片值赋于纹理
        texture.image = img;
        texture.needsUpdate = true;
      });

      let myGeometry = new THREE.PlaneGeometry(200, 200, 1)


      let myMaterial = new THREE.MeshBasicMaterial({map:texture});
      let mesh = new THREE.Mesh( myGeometry, myMaterial );
      mesh.translateZ(10);
      mesh.position.x = val.x
      mesh.position.y = val.y
      plane.add(mesh);

    })

    this.$scene.add(plane);


  }

  // 添加防御塔
  addTower(){
    let Tower1 = new Tower({
      x: -118,
      z: 62,
      face: 'a',
      speed: 0.01
    })
    this.$scene.add(Tower1.getElement());
    this.aimationBox.push(Tower1)


    let Tower2 = new Tower({
      x: -174,
      z: 176,
      face: 'b',
      speed: 0.008
    })
    this.$scene.add(Tower2.getElement());
    this.aimationBox.push(Tower2)




    let Tower3 = new Tower({
      x: -270,
      z: 250,
      face: 'c',
      speed: 0.006
    })
    this.$scene.add(Tower3.getElement());
    this.aimationBox.push(Tower3)



    let Tower4 = new Tower({
      x: -220,
      z: 430,
      face: 'd',
      speed: 0.005
    })
    this.$scene.add(Tower4.getElement());
    this.aimationBox.push(Tower4)


    let Tower5 = new Tower({
      x: -450,
      z: 214,
      face: 'd',
      speed: 0.005
    })
    this.$scene.add(Tower5.getElement());
    this.aimationBox.push(Tower5)


    let Tower6 = new Tower({
      x: 450,
      z: 196,
      face: 'e',
      speed: 0.005
    })
    this.$scene.add(Tower6.getElement());
    this.aimationBox.push(Tower6)

    let Tower7 = new Tower({
      x: -374,
      z: 393,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower7.getElement());
    this.aimationBox.push(Tower7)


    let Tower8 = new Tower({
      x: -404,
      z: 360,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower8.getElement());
    this.aimationBox.push(Tower8)


    let Tower9 = new Tower({
      x: -422,
      z: 42,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower9.getElement());
    this.aimationBox.push(Tower9)


    let Tower10 = new Tower({
      x: -460,
      z: -220,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower10.getElement());
    this.aimationBox.push(Tower10)


    let Tower11 = new Tower({
      x: -224,
      z: -464,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower11.getElement());
    this.aimationBox.push(Tower11)


    let Tower12 = new Tower({
      x: 35,
      z: -430,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower12.getElement());
    this.aimationBox.push(Tower12)


    let Tower13 = new Tower({
      x: 220,
      z: -445,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower13.getElement());
    this.aimationBox.push(Tower13)



    let Tower14 = new Tower({
      x: 366,
      z: -409,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower14.getElement());
    this.aimationBox.push(Tower14)

    let Tower15 = new Tower({
      x: 399,
      z: -376,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower15.getElement());
    this.aimationBox.push(Tower15)




    let Tower16 = new Tower({
      x: 263,
      z: -277,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower16.getElement());
    this.aimationBox.push(Tower16)



    let Tower17 = new Tower({
      x: 263,
      z: -277,
      face: 'f',
      speed: 0.004
    })
    this.$scene.add(Tower17.getElement());
    this.aimationBox.push(Tower17)
  }



  // render
  render(){
    this.$renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.$renderer.setSize(window.innerWidth, window.innerHeight);
    this.$el.appendChild(this.$renderer.domElement);
    this.$renderer.render(this.$scene, this.$camera);
  }

  // controller
  controller(){
    this.$controls = new OrbitControls(this.$camera, this.$renderer.domElement);
    this.$controls.enablePan = true;
  }

  initStats(){
    this.$stats = new Stats();
    document.body.appendChild(this.$stats.dom);
  }

  animate(){

    requestAnimationFrame( this.animate.bind(this) );

    // required if controls.enableDamping or controls.autoRotate are set to true
    this.$controls.update();
    this.$stats.update();


    this.aimationBox.forEach(val=>{
      val.animation && val.animation()
    })

    this.$renderer.render( this.$scene, this.$camera );
  }

}


export default LoL
