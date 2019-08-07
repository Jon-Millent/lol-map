
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
    this.$camera.position.set(3, 100, 5);
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
      z: 62
    })
    this.$scene.add(Tower1.getElement());
    this.aimationBox.push(Tower1)


    let Tower2 = new Tower({
      x: -174,
      z: 176
    })
    this.$scene.add(Tower2.getElement());
    this.aimationBox.push(Tower2)
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
