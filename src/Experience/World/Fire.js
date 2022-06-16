import * as THREE from 'three'
import Experience from "../Experience";



export default class Fire {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.fire()

    }
    fire() {
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load('../textures/fire/fire.png')
        const particlesGeometry = new THREE.BufferGeometry()
        const count = 50000
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() * 0.5) - 0.25
            positions[i + 1] = (Math.random() * 3)
            positions[i + 2] = (Math.random() * 0.5) - 0.25
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        const particlesMaterial = new THREE.PointsMaterial({
            size: 2,
            sizeAttenuation: true,
            map: texture,
            transparent: true,
            alphaMap: texture,
        })
        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        this.scene.add(particles)
        console.log('fire')
    }
}