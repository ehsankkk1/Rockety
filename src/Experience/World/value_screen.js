import * as THREE from 'three'
import Physics from '../../Physics/Physics';
import Experience from "../Experience";
import Environment from './Enviroment.js'
import Vector3 from 'three'

let text;
let height = 0;
export default class ValueScreen {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.startFolder = this.debug.ui.addFolder('start values')
        this.physics = new Physics()


        this.startFolder.add(this.physics.rocket, "structural_mass", 1);
        this.startFolder.add(this.physics.rocket, "fuel_mass", 0);
        this.startFolder.add(this.physics.rocket, "payload_mass", 0);
        this.startFolder.add(this.physics.rocket, "diameter", 0.01);
        this.startFolder.add(this.physics.rocket, "height_r", 0.01);
        this.startFolder.add(this.physics.rocket, "drag_coefficient", 0.001);
        this.startFolder.add(this.physics.rocket, "lift_coefficient", 0.001);
        this.startFolder.add(this.physics.thrust, "fuel_type");
        this.startFolder.add(this.physics.thrust, "p0", 0);
        this.startFolder.add(this.physics.thrust, "pe", 0);
        this.startFolder.add(this.physics.thrust, "A_throat"), 0.01;
        this.startFolder.add(this.physics.thrust, "Ae", 0.01);
        this.startFolder.add(this.physics.thrust, "burn_rate", 0.01);
        this.startFolder.add(this.experience, 'start');



        text = {
                element: document.querySelector('.text')
            }
            //this.scene.add(cube);
    }

    update() {
        height = this.physics.rocket.height;
        document.getElementById("height").innerHTML = height;
        let speed = this.physics.rocket.velocity.y
        document.getElementById("speed").innerHTML = speed;
        let rho = this.physics.atmosphere.rho
        document.getElementById("rho").innerHTML = rho;
        let layer = this.physics.atmosphere.layer
        document.getElementById("layer").innerHTML = layer;
        let weight = this.physics.weight.weight_force.y
        document.getElementById("weight").innerHTML = weight;
        let gravity = this.physics.weight.current_gravity.y
        document.getElementById("gravity").innerHTML = gravity;
        if (this.physics.rocket.velocity.y < 0 ) {
            document.getElementById("message").innerHTML = "Fetal Error ";
            document.getElementById("height2").innerHTML = height;
            document.getElementById("speed2").innerHTML = speed
            if (height < 0){
                document.getElementById("height2").innerHTML = 0;
            }
            if (speed < 0 ){
                document.getElementById("speed2").innerHTML = 0
            }
            document.getElementById("layer2").innerHTML = layer;
            this.toggleScreen('gameover-screen', true);
        }
        if(height > 10000000){
            document.getElementById("message").innerHTML = "END of the Simulation ";
            document.getElementById("height2").innerHTML = height;
            document.getElementById("speed2").innerHTML = speed
            document.getElementById("layer2").innerHTML = layer;
            this.toggleScreen('gameover-screen', true);
        }
        //cube.rotation.y += 0.01
    }

    toggleScreen(id, toggle) {
        let element = document.getElementById(id);
        let display = (toggle) ? 'block' : 'none';
        element.style.display = display;
    }
}