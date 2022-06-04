import * as THREE from 'three'
import Experience from "../Experience.js";


let cube;
export default class Enviroment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.setSunLight()

    }
    update() {
        //cube.rotation.y += 0.01
    }


    
    setSunLight()
    {  
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        this.scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.camera.far = 15
        directionalLight.shadow.camera.left = - 7
        directionalLight.shadow.camera.top = 7
        directionalLight.shadow.camera.right = 7
        directionalLight.shadow.camera.bottom = - 7
        directionalLight.position.set(- 5, 5, 0)
        this.scene.add(directionalLight)

    }
}