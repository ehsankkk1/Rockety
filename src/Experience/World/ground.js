import * as THREE from 'three'
import { MirroredRepeatWrapping, TextureLoader } from 'three';
import Experience from "../Experience";



export default class Ground {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
            //this.Ground()
        this.Floor()
    }
    update() {

    }
    Ground() {
        const groundGeo = new THREE.PlaneGeometry(100, 100);
        const groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        groundMat.color.setHSL(0.095, 1, 0.75);

        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.position.y = -33;
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }
    Floor() {
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load('../ss.jpg')
        texture.repeat.x = 50
        texture.repeat.y = 50
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshBasicMaterial({ map: texture })
        )
        floor.receiveShadow = true
        floor.rotation.x = -Math.PI * 0.5
        this.scene.add(floor)
    }
}