import * as THREE from 'three'
import Experience from "../Experience";
import Environment from './Enviroment.js'


export default class Light {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.light()
    }
    update() {
        
    }
    light() {
        const dirLight = new THREE.DirectionalLight(0xfffffff, 1.5);
        dirLight.color.setHSL(0.1,1, 0.8);
        dirLight.position.set(-1, 1, 1);
        dirLight.position.multiplyScalar(30);
        this.scene.add(dirLight);

        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        const d = 50;

        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;

        const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
        this.scene.add(dirLightHelper);
    }
  
}