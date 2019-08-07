
import * as THREE from 'three';

class Tower {

  constructor(config) {
    this.config = config || {}


    this.rotateDeg = 0

    this.tower = null
    this.body = null
    this.head = null
  }

  animation(){
    this.head.rotation.y += 0.008
  }

  getElement(){

    let height = 70

    let geometry = new THREE.CylinderGeometry(8, 15 ,height ,40 ,40);
    // Cube Material Info(not metal)

    let url = 'image/obj/tower-textarea.jpg'
    let texture = new THREE.Texture();
    let imgLoader = new THREE.ImageLoader();
    imgLoader.load(url,function(img){
      //将图片值赋于纹理
      texture.image = img;
      texture.needsUpdate = true;
    });


    let material = new THREE.MeshBasicMaterial({map:texture});
    // Create Cube
    this.tower = new THREE.Mesh(geometry, material);

    this.tower.position.x = this.config.x
    this.tower.position.y = height / 2
    this.tower.position.z = this.config.z


    // 添加body
    let bodyUrl = 'image/obj/tower-body-textarea.jpg'
    let bodyTexture = new THREE.Texture();
    let bodyImgLoader = new THREE.ImageLoader();
    bodyImgLoader.load(bodyUrl,function(img){
      //将图片值赋于纹理
      bodyTexture.image = img;
      bodyTexture.needsUpdate = true;
    });
    let bodyElement = new THREE.SphereGeometry(16, 40, 40);
    let bodyMaterial = new THREE.MeshBasicMaterial({map:bodyTexture});
    this.body = new THREE.Mesh(bodyElement, bodyMaterial);

    this.tower.add(this.body)


    // 添加头部
    let headUrl = 'image/obj/tower-head-textarea.jpg'
    let headTexture = new THREE.Texture();
    let headImgLoader = new THREE.ImageLoader();
    headImgLoader.load(headUrl,function(img){
      //将图片值赋于纹理
      headTexture.image = img;
      headTexture.needsUpdate = true;
    });
    let headElement = new THREE.SphereGeometry(10, 20, 20);
    let headMaterial = new THREE.MeshBasicMaterial({map:headTexture});
    this.head = new THREE.Mesh(headElement, headMaterial);
    this.head.position.y = 40



    this.tower.add(this.head)

    return this.tower
  }

}

export default Tower
