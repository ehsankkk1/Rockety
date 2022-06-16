import * as THREE from 'three'
import Experience from "../Experience.js";
import StarrySkyShader from './StarrySkyShader.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';


export default class Enviroment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.debugFolder = this.debug.ui.addFolder('skyshader')
        this.light()
        //this.skydome()
        this.skyshader()


    }
    update() {
        
    }
    skyshader() {
        
        const sun = new THREE.Vector3(0, 0, 0);
        const sky = new Sky()
        sky.scale.setScalar(450000);
        this.scene.add(sky)
        let effectController = {
            turbidity: 10,
            rayleigh: 3,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.7,
            elevation:5,
            azimuth: -90,
            exposure: this.renderer.toneMappingExposure,
        };
        function guiChanged() {
        const uniforms = sky.material.uniforms;
        uniforms['turbidity'].value = effectController.turbidity;
        uniforms['rayleigh'].value = effectController.rayleigh;
        uniforms['mieCoefficient'].value = effectController.mieCoefficient;
        uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;
        const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
        const theta = THREE.MathUtils.degToRad(effectController.azimuth);
        sun.setFromSphericalCoords(1, phi, theta);
        
        uniforms['sunPosition'].value.copy(sun);
    }
        //this.renderer.toneMappingExposure = effectController.exposure;
        this.debugFolder.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
        this.debugFolder.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
        this.debugFolder.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
        this.debugFolder.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
        this.debugFolder.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
        this.debugFolder.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
        //this.debug.ui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );

        guiChanged();
       // Debug
       
       
    }
    light() {
        const dirLight = new THREE.DirectionalLight(0xfffffff, 1.5);
        dirLight.color.setHSL(0.1,1, 0.8);
        dirLight.position.set(-1, 1, 1);
        dirLight.position.multiplyScalar(30);
        this.scene.add(dirLight);

        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        const d = 50;

        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;

        const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
        this.scene.add(dirLightHelper);
    }
    skydome() {
        var skyDomeRadius = 500.01;
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
        var sphereGeometry = new THREE.SphereGeometry(skyDomeRadius, 20, 20);
        var skyDome = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.scene.add(skyDome);
    }

}