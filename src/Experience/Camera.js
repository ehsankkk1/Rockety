import * as THREE from 'three'
import Experience from "./Experience"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class Camere {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.setInstance()
        this.setControls()
    }
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            60,
            this.sizes.width / this.sizes.height,
            0.1,
            100000
        )
        this.instance.position.set(0, 10, 25)
            // this.instance.rotation.x = -Math.PI * 0.2
        this.scene.add(this.instance)
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true

    }
    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    update() {
        //this.controls.update()
    }
}