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
        let pressure = this.physics.atmosphere.pressure
        document.getElementById("pressure").innerHTML = pressure;
        //cube.rotation.y += 0.01
    }
}