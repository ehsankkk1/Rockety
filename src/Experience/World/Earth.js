import Experience from "../Experience";
import * as THREE from 'three'
export default class Earth {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        const textureLoader = new THREE.TextureLoader()

        var geometry = new THREE.SphereGeometry(600, 32, 32);
        var material = new THREE.MeshPhongMaterial({
            map: textureLoader.load('../Earth/diffuse.jpg'),
            bumpMap: textureLoader.load('../Earth/bump.png'),
            bumpScale: 0.05,
            specularMap: textureLoader.load('../Earth/earthspec1k.png')

        });
        material.specular = new THREE.Color('grey')
        var earthmesh = new THREE.Mesh(geometry, material);

        this.scene.add(earthmesh)
            // var geometry2 = new THREE.SphereGeometry(500, 32, 32)
            // var material2 = new THREE.MeshBasicMaterial({
            //     map: textureLoader.load('../Earth/rzA2U.jpg'),
            //     alphaMap: textureLoader.load('../Earth/ngioK.png'),
            //     side: THREE.DoubleSide,
            //     opacity: 0.8,
            //     transparent: true,
            //     depthWrite: false,
            // });
            // var cloudMesh = new THREE.Mesh(geometry2, material2)
            // earthmesh.add(cloudMesh)
    }
}