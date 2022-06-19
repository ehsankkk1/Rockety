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
        this.physics = new Physics()
        text = {
                element: document.querySelector('.text')
            }
            //this.scene.add(cube);
    }

    update() {
        height = this.physics.rocket.height;
        document.getElementById("height").innerHTML = height;
        let speed = this.physics.rocket.velocity.length()
        document.getElementById("speed").innerHTML = speed;
        let rho = this.physics.atmosphere.rho
        document.getElementById("rho").innerHTML = rho;
        let layer = this.physics.atmosphere.layer
        document.getElementById("layer").innerHTML = layer;
        let weight = this.physics.weight.weight_force.y
        document.getElementById("weight").innerHTML = weight;
        let gravity = this.physics.weight.current_gravity.y
        document.getElementById("gravity").innerHTML = gravity;
        if (height < -1){
            document.getElementById("message").innerHTML = "Fetal Error ";
            document.getElementById("height2").innerHTML = 0;
            this.toggleScreen('gameover-screen',true);
        }
        //cube.rotation.y += 0.01
    }

    toggleScreen(id,toggle) {
        let element = document.getElementById(id);
        let display = ( toggle ) ? 'block' : 'none';
        element.style.display = display;
    }
}