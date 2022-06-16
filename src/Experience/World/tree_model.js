import * as THREE from 'three'
import Experience from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class TreeModel {


    constructor() {
        for(let i=0;i<70;i++) {
            this.loadTree((Math.random()* 70),(Math.random() *-70)-5);
            this.loadTree((Math.random()* -70),(Math.random() *-70-5));
   
        }

    }
    loadTree(x, z){
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

                gltf.scene.scale.set(0.3, 0.3, 0.3)
                tree = gltf.scene
                tree.position.x = x
                tree.position.z = z
                this.scene.add(tree)

            }
        )
    }
    update() {

    }
}