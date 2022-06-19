import Experience from "../Experience";
import StarrySkyShader from './StarrySkyShader.js';
import * as THREE from 'three'
export default class Earth {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        const textureLoader = new THREE.TextureLoader()

        var geometry = new THREE.SphereGeometry(10000, 32, 32);
        var material = new THREE.MeshPhongMaterial({
            map: textureLoader.load('../Earth/diffuse.jpg'),
            bumpMap: textureLoader.load('../Earth/bump.png'),
            bumpScale: 0.05,
            specularMap: textureLoader.load('../Earth/earthspec1k.png')

        });
        material.specular = new THREE.Color('grey')
        var earthmesh = new THREE.Mesh(geometry, material);

        this.scene.add(earthmesh)
        //this.skydome();
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
    skydome() {
        var skyDomeRadius = 100000;
        var sphereMaterial = new THREE.ShaderMaterial({
            uniforms: {
                skyRadius: { value: skyDomeRadius },
                env_c1: { value: new THREE.Color("#0d1a2f") },
                env_c2: { value: new THREE.Color("#0f8682") },
                noiseOffset: { value: new THREE.Vector3(100.01, 100.01, 100.01) },
                starSize: { value: 0.01 },
                starDensity: { value: 0.09 },
                clusterStrength: { value: 0.2 },
                clusterSize: { value: 0.2 },
            },
            vertexShader: StarrySkyShader.vertexShader,
            fragmentShader: StarrySkyShader.fragmentShader,
            side: THREE.DoubleSide,
        })
        var sphereGeometry = new THREE.SphereGeometry(skyDomeRadius, 32, 32);
        var skyDome = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.scene.add(skyDome);
    }
}