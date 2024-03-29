import * as THREE from 'three'
import Experience from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

let  platform, pad;

export default class LauncherModel {


    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.time = this.experience.time


        this.loadPlatform()
        this.loadPad()
    }
    loadPlatform() {
        // Platform loader
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        platform = new THREE.Object3D();


        // platform Model 
        gltfLoader.load(
            '/models/platform/scene.gltf',
            (gltf) => {

                gltf.scene.scale.set(0.015, 0.015, 0.015)
                platform = gltf.scene
                platform.position.x = -9.5
                platform.position.z = 2
                platform.rotation.y = 1 * Math.PI / 180;
                this.scene.add(platform)

            }
        )
    }
    loadPad() {
        // pad loader
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        pad = new THREE.Object3D();


        // pad Model 
        gltfLoader.load(
            '/models/landing_pad/scene.gltf',
            (gltf) => {

                gltf.scene.scale.set(8, 8, 8)
                pad = gltf.scene
                pad.position.x = 0
                pad.position.z = 0
                pad.rotation.y = 1 * Math.PI / 180;
                this.scene.add(pad)

            }
        )
    }
    update() {
        
    }
}
