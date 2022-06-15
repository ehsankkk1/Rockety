import * as THREE from 'three'
import Experience from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

let rocket, fire;
let mixer=null;
export default class RocketModel {
    

    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.loadRocket()
        this.loadFire()
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
        // Rocket loader
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        fire = new THREE.Object3D();


        // Rocket Model 
        
        gltfLoader.load(
            '/models/fire/scene.gltf',
            (gltf) => {

                //gltf.scene.scale.set(1, 1, 1)

                fire = gltf.scene
                mixer = new THREE.AnimationMixer(gltf.scene)

                fire.position.x = 2
                fire.position.y = 4
            
                
                // Animation
                
                
                const action = mixer.clipAction(gltf.animations[0])
                action.setLoop( THREE.LoopRepeat );
                action.play()
                this.scene.add(fire)

            }
        )
    }

    update() {
        if (mixer != null) {
         mixer.update(this.time.delta)   
        } 
        
        //rocket.position.y += 0.1;
        //this.camera.instance.position.y +=  0.1;
    }


}
