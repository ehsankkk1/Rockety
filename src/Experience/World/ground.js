import * as THREE from 'three'
import { MirroredRepeatWrapping, TextureLoader } from 'three';
import Experience from "../Experience";



export default class Ground {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
            //this.Ground()
        this.Floor()
    }
    update() {

    }
    Ground() {
        const groundGeo = new THREE.PlaneGeometry(100, 100);
        const groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        groundMat.color.setHSL(0.095, 1, 0.75);

        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.position.y = -33;
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }
    Floor() {
        const textureLoader = new THREE.TextureLoader()
        const grassColorTexture = textureLoader.load('../textures/grass/color.jpg')
        const grassAmbientOcclusionTexture = textureLoader.load('../textures/grass/ambientOcclusion.jpg')
        const grassNormalTexture = textureLoader.load('../textures/grass/normal.jpg')
        const grassRoughnessTexture = textureLoader.load('../textures/grass/roughness.jpg')

        grassColorTexture.repeat.set(30, 30)
        grassAmbientOcclusionTexture.repeat.set(30, 30)
        grassNormalTexture.repeat.set(30, 30)
        grassRoughnessTexture.repeat.set(30, 30)

        grassColorTexture.wrapS = THREE.RepeatWrapping
        grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
        grassNormalTexture.wrapS = THREE.RepeatWrapping
        grassRoughnessTexture.wrapS = THREE.RepeatWrapping

        grassColorTexture.wrapT = THREE.RepeatWrapping
        grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
        grassNormalTexture.wrapT = THREE.RepeatWrapping
        grassRoughnessTexture.wrapT = THREE.RepeatWrapping

        const floor = new THREE.Mesh(
            new THREE.RingGeometry(0, 100, 30, 30),
            new THREE.MeshStandardMaterial({
                map: grassColorTexture,
                aoMap: grassAmbientOcclusionTexture,
                normalMap: grassNormalTexture,
                roughnessMap: grassRoughnessTexture
            })
        )

        floor.receiveShadow = true
        floor.rotation.x = -Math.PI * 0.5
        floor.position.y = 0
        this.scene.add(floor)
    }
}