
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'
import Stats from 'stats-js'
import groundConfig from '../config/ground'

class LoL {

  constructor(el){
    this.$scene = null;
    this.$camera = null;
    this.$renderer = null;
    this.$controls = null;

    this.$el = el
    this.$stats = null
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

    this.animate()

  }


  // 添加地面
  addGround(){
    let geometry = new THREE.PlaneGeometry(1000, 1000, 1);
    let material = new THREE.MeshBasicMaterial({color: 0xeeefff, side: THREE.DoubleSide});
    let plane = new THREE.Mesh(geometry, material);


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

    this.$renderer.render( this.$scene, this.$camera );
  }

}


export default LoL
