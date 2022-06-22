import * as THREE from 'three'
import Experience from "../Experience";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Physics from '../../Physics/Physics';
import { Vector3 } from 'three';

let rocket, fire;
let mixer = null;
export default class RocketModel {


    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.physics = new Physics()

        this.loadFire()
        this.loadRocket()


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



    update() {
        if (mixer != null) {
            mixer.update(this.time.delta)
        }
        rocket.position.x = this.physics.rocket.position.x / 100
        rocket.position.y = this.physics.rocket.position.y / 100
        rocket.position.z = this.physics.rocket.position.z / 100
        fire.position.x = this.physics.rocket.position.x / 100
        fire.position.y = this.physics.rocket.position.y / 100 - 1.5
        fire.position.z = this.physics.rocket.position.z / 100 
        this.camera.instance.position.x = rocket.position.x /2
        this.camera.instance.position.y = rocket.position.y + 10
        rocket.rotation.y += this.physics.rocket.angle_of_attack /100

        if (this.physics.rocket.fuel_mass < 0) {
            this.scene.remove(fire)
        }
    }


}