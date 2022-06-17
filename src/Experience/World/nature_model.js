import * as THREE from 'three'
import Experience from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class NatureModel {


    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        for(let i=0;i<50;i++) {
            const angle = Math.random() * Math.PI * 2 // Random angle
            const radius = 10 + Math.random() * 50  
            const x = Math.cos(angle) * radius        // Get the x position using cosinus
            const z = Math.sin(angle) * radius 
            this.loadTree(x,z);
      

        }
        this.loadMountain(0,-80,180)
        this.loadMountain(80,-0,90)
        this.loadMountain(0,80,180)
        this.loadMountain(-80,0,90)
        //this.loadMountain(-50,-90)
        for(let i=0;i<25;i++){
            const angle = Math.random() * Math.PI * 2 // Random angle
            const radius = 30 + Math.random() * 80  
            const radius2  = 100 + Math.random() * 500      // Random radius
            const x = Math.cos(angle) * radius        // Get the x position using cosinus
            const z = Math.sin(angle) * radius // Get the z position using sinus
            const y = radius2       
            this.loadCloud(x,z,y)   
        }
        

    }
    loadTree(x, z){

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
    loadMountain(x,z,r){


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
    loadCloud(x,z,y){


        // Cloud loader
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        var cloud = new THREE.Object3D();

        // Cloud Model 
        gltfLoader.load(
            '/models/cloud/scene.gltf',
            (gltf) => {

                gltf.scene.scale.set(0.3, 0.3, 0.3)
                cloud = gltf.scene
                cloud.position.x = x
                cloud.position.y = y
                cloud.position.z = z
                this.scene.add(cloud)

            }
        )
    }
    update() {

    }
}