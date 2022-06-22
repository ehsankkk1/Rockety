import * as THREE from 'three'
import Experience from "../Experience.js";
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import Physics from '../../Physics/Physics.js';


let effectController, sun, sky;

export default class Enviroment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.debugFolder = this.debug.ui.addFolder('skyshader')
        this.physics = new Physics()
            //this.skydome()

        sun = new THREE.Vector3(0, 0, 0);
        sky = new Sky()
        sky.scale.setScalar(450000);
        this.scene.add(sky)
        effectController = {
            turbidity: 7,
            rayleigh: 1.1,
            mieCoefficient: 0.035,
            mieDirectionalG: 1,
            elevation: 18.5, //25
            azimuth: -150,
            exposure: this.renderer.toneMappingExposure,
        };

        //this.renderer.toneMappingExposure = effectController.exposure;
        this.debugFolder.add(effectController, 'turbidity', 0.0, 20.0, 0.1).listen().onChange(this.guiChanged);
        this.debugFolder.add(effectController, 'rayleigh', 0.0, 4, 0.001).listen().onChange(this.guiChanged);
        this.debugFolder.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).listen().onChange(this.guiChanged);
        this.debugFolder.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).listen().onChange(this.guiChanged);
        this.debugFolder.add(effectController, 'elevation', 0, 90, 0.1).listen().onChange(this.guiChanged);
        this.debugFolder.add(effectController, 'azimuth', -180, 180, 0.1).listen().onChange(this.guiChanged);
        //this.debug.ui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );

        this.guiChanged();
        // Debug

    }
    update() {
        let height = this.physics.rocket.height;
        if (height < 14500) {
            this.check1(effectController)
        } else if (height < 50000) {
            effectController.rayleigh = 2
            this.check1(effectController)
        } else if (height < 85000) {
            effectController.rayleigh = 0.35
            this.check1(effectController)
        } else if (height < 600000) {
            effectController.rayleigh = 0.2
            this.check1(effectController)
        } else if (height < 985000) {
            //effectController.rayleigh = 1
            this.check1(effectController)
        } else if (height < 10000000) {
            //effectController.rayleigh = 0
            this.check1(effectController)
        } else if (height > 10000000) {
            effectController.rayleigh = 0
            this.check1(effectController)
        }
    }
    check1(value) {
        let oldvalue;

        if (oldvalue != value) {
            oldvalue = value;
            this.guiChanged()
        }

    }


    guiChanged() {
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


}