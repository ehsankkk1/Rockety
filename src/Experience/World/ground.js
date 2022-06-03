import * as THREE from 'three'
import Experience from "../Experience";



export default class Ground {
    constructor() {
        console.log('Ground')
        this.experience = new Experience()
        this.scene = this.experience.scene

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 20),
            new THREE.MeshStandardMaterial({
                color: '#444444',
                metalness: 0,
                roughness: 0.5
            })
        )
        floor.receiveShadow = true
        floor.rotation.x = - Math.PI * 0.5
        this.scene.add(floor)
    }
    update() {

    }
}