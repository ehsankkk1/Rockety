import * as THREE from 'three'
import Experience from "../Experience";
import Environment from './Enviroment.js'

let text;
export default class ValueScreen {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.environment = new Environment()

        text ={

            element: document.querySelector('.text')
        }
        console.log(text.element.innerHTML)
        //this.scene.add(cube);
    }
    update() {

        text.element.innerHTML = "Height : 0 m <br> Speed : 0 ms <br> Pressure : 0 KG/mole";
        //cube.rotation.y += 0.01
    }
}