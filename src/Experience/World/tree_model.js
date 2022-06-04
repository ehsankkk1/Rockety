import * as THREE from 'three'
import Experience from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class TreeModel {


    constructor() {
        console.log('TreeModel constructor')
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Tree loader
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        var tree = new THREE.Object3D();

        // Tree Model 
        gltfLoader.load(
            '/models/GreenTree/scene.gltf',
            (gltf) => {

                gltf.scene.scale.set(0.08, 0.08, 0.08)
                tree = gltf.scene
                tree.position.x = 1
                this.scene.add(tree)

            }
        )

    }
    update() {

    }
}