
import * as THREE from 'three';

class Tower {

  constructor(config) {
    this.config = config || {}


    this.rotateDeg = 0

    this.tower = null
    this.body = null
    this.head = null
    this.arm = null
    this.bang = null
    this.speed = this.config.speed || 0.008

    this.hpWrap = null
    this.hpTarget = null


    this.faceUrlGroup = {
      a: 'image/obj/tower-head-textarea.jpg',
      b: 'image/obj/face-textarea-a.jpeg',
      c: 'image/obj/face-textarea-b.jpeg',
      d: 'image/obj/face-textarea-c.jpeg',
      e: 'image/obj/face-textarea-d.jpeg',
      f: 'image/obj/face-textarea-e.jpeg',
    }
  }

  animation(){
    this.head.rotation.y += this.speed
  }


  changeXYZ(x, y, z){
    this.tower.position.x = x
    this.tower.position.y = y
    this.tower.position.z = z
  }

  getXYZ(){
    return this.tower.position
  }


  changeRotate(x, y, z){
    this.hpWrap.rotation.x = x
    this.hpWrap.rotation.y = y
    this.hpWrap.rotation.z = z
  }

  getRotate(){
    return this.hpWrap.rotation
  }

  getElement(){

    let height = 50

    let geometry = new THREE.CylinderGeometry(4, 10 ,height ,40 ,40);
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
    let bodyElement = new THREE.SphereGeometry(10, 20, 20);
    let bodyMaterial = new THREE.MeshBasicMaterial({map:bodyTexture});
    this.body = new THREE.Mesh(bodyElement, bodyMaterial);

    this.tower.add(this.body)


    // 添加头部
    let headUrl = this.faceUrlGroup[this.config.face] || this.faceUrlGroup['a']
    let headTexture = new THREE.Texture();
    let headImgLoader = new THREE.ImageLoader();
    headImgLoader.load(headUrl,function(img){
      //将图片值赋于纹理
      headTexture.image = img;
      headTexture.needsUpdate = true;
    });
    let headElement = new THREE.SphereGeometry(6, 20, 20);
    let headMaterial = new THREE.MeshBasicMaterial({map:headTexture});
    this.head = new THREE.Mesh(headElement, headMaterial);
    this.head.position.y = 28

    this.tower.add(this.head)




    // 添加手
    let armImgLoader = new THREE.ImageLoader();
    let armTexture = new THREE.Texture();
    armImgLoader.load(bodyUrl,function(img){
      //将图片值赋于纹理
      armTexture.image = img;
      armTexture.needsUpdate = true;
    });
    let armElement = new THREE.CylinderGeometry(1, 1 ,14 ,40 ,400);
    let armMaterial = new THREE.MeshBasicMaterial({map: armTexture});
    this.arm = new THREE.Mesh(armElement, armMaterial);

    this.arm.rotation.z = 1.5
    this.arm.rotation.y = -0.7
    this.arm.position.y = 20
    this.arm.position.x = 6
    this.arm.position.z = 6
    this.tower.add(this.arm)


    // 添加金箍棒
    let bangImgLoader = new THREE.ImageLoader();
    let bangTexture = new THREE.Texture();
    bangImgLoader.load('image/obj/jingubang-textarea.jpg',function(img){
      //将图片值赋于纹理
      bangTexture.image = img;
      bangTexture.needsUpdate = true;
    });
    let bangElement = new THREE.CylinderGeometry(1, 0.4 ,30 ,30 ,30);
    let bangMaterial = new THREE.MeshBasicMaterial({map: bangTexture});
    this.bang = new THREE.Mesh(bangElement, bangMaterial);
    this.bang.position.z = 10
    this.bang.position.y = 20
    this.bang.position.x = 10

    this.tower.add(this.bang)


    // 添加血量条


    let cubeGeometry = new THREE.BoxGeometry(40,3,2);

    let cubeMaterial = new THREE.MeshBasicMaterial({color:0x000000});
    let hpWrap = this.hpWrap = new THREE.Mesh(cubeGeometry,cubeMaterial);

    hpWrap.position.x=0;
    hpWrap.position.y = 41;
    hpWrap.position.z=0;
    hpWrap.rotation.y = 2.929

    this.tower.add(hpWrap);



    let cubeGeometry2 = new THREE.BoxGeometry(38,2.9,3);

    let cubeMaterial2 = new THREE.MeshBasicMaterial({color:0xe00e00});
    let hpTarget = this.hpTarget = new THREE.Mesh(cubeGeometry2, cubeMaterial2);

    hpTarget.position.x=0;
    hpTarget.position.y = 41;
    hpTarget.position.z=0;
    hpTarget.rotation.y = 2.929

    this.tower.add(hpTarget);




    return this.tower
  }

}

export default Tower
