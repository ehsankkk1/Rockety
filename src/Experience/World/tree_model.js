import * as THREE from 'three'
import Experience from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class TreeModel {


    constructor() {
        for(let i=0;i<35;i++) {
            this.loadTree((Math.random()* 50)+3,(Math.random() *-50)-3);
            this.loadTree((Math.random()* -50)-3,(Math.random() *-50)-3);
            this.loadTree((Math.random()* -50)-3,(Math.random() *50)+3);
            this.loadTree((Math.random()* 50)+3,(Math.random() *50)+3);

        }
        this.loadMountain(0,-80,180)
        this.loadMountain(80,-0,90)
        this.loadMountain(0,80,180)
        this.loadMountain(-80,0,90)
        //this.loadMountain(-50,-90)

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
    loadMountain(x, z,r){
        this.experience = new Experience()
        this.scene = this.experience.scene

        // mountain loader
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        var mountain = new THREE.Object3D();

        // mountain Model 
        gltfLoader.load(
            
            '/models/mountain/scene.gltf',
            (gltf) => {

                gltf.scene.scale.set(40, 7, 10)
                mountain = gltf.scene
                mountain.position.x = x
                mountain.position.z = z
                mountain.rotation.y = r*Math.PI/180;
                mountain.position.y = 0
                
                this.scene.add(mountain)

            }
        )
    }
    update() {

    }
}