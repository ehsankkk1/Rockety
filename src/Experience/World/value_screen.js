import * as THREE from 'three'
import Experience from "../Experience";
import Environment from './Enviroment.js'

let text;
let height=0 ;
export default class ValueScreen {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.environment = new Environment()

        text ={
            element: document.querySelector('.text')
       } 
        //this.scene.add(cube);
    }
   
    update() {
        height +=1;
        document.getElementById("height").innerHTML = height ;
        document.getElementById("speed").innerHTML = "150" ;
        document.getElementById("pressure").innerHTML = "25" ;
        //cube.rotation.y += 0.01
    }
}