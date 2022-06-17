import * as THREE from 'three'
import Experience from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

let rocket, fire, platform,pad;
let mixer = null;
export default class RocketModel {


    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.time = this.experience.time
        

        this.loadFire()
        this.loadRocket()
        this.loadPlatform()
        this.loadPad()
    }
    loadRocket() {
        // Rocket loader
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        rocket = new THREE.Object3D();


        // Rocket Model 
        gltfLoader.load(
            '/models/rocket/scene.gltf',
            (gltf) => {

                gltf.scene.scale.set(0.08, 0.08, 0.08)
                rocket = gltf.scene
                this.scene.add(rocket)

            }
        )
    }


    loadFire() {
        // Fire loader
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        fire = new THREE.Object3D();

        // Fire Model 

        gltfLoader.load(
            '/models/fire/scene.gltf',
            (gltf) => {

                gltf.scene.scale.set(0.7, 0.7, 0.7)

                fire = gltf.scene
                mixer = new THREE.AnimationMixer(gltf.scene)

                fire.position.x = 0
                fire.position.y = -1.5
                fire.rotation.x = Math.PI;
            
                
                // Animation


                const action = mixer.clipAction(gltf.animations[0])
                action.setLoop(THREE.LoopRepeat);
                action.play()
                this.scene.add(fire)

            }
        )
        
        
    }
    loadPlatform(){
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
                       platform.rotation.y = 1*Math.PI/180;
                       this.scene.add(platform)
       
                   }
               )
    }
    loadPad(){
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
                pad.position.x =0
                pad.position.z = 0
                pad.rotation.y = 1*Math.PI/180;
                this.scene.add(pad)

            }
        )
}

    update() {
        if (mixer != null) {
            mixer.update(this.time.delta)
        }
        //rocket.position.y =50;
        //fire.position.y =5;
        //this.camera.instance.position.y += 0.5;
        //this.camera.instance.position.y = 5;
    }


}