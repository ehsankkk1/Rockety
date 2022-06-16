    import * as THREE from 'three'
    import Experience from "../Experience";
    import Environment from './Enviroment.js'
    
    let cube;
    export default class World {
        constructor() {
            this.experience = new Experience()
            this.scene = this.experience.scene
            const geometry = new THREE.BoxBufferGeometry(2, 1, 1)
            const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
            cube = new THREE.Mesh(geometry, material)
            //this.scene.add(cube);
        }
        update() {
            //cube.rotation.y += 0.01
        }
    }