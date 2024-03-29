import * as THREE from 'three'
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import World from './World/World.js';
import Ground from './World/Ground.js';
import RocketModel from './World/Rocket_model.js';
import NatureModel from './World/nature_model.js';
import Fire from './World/Fire.js';
import Earth from './World/Earth.js';
import ValueScreen from './World/value_screen.js';
import Physics from '../Physics/Physics.js';
import Debug from './Utils/Debug.js';
import Enviroment from './World/Enviroment.js';
import LauncherModel from './World/launcher_model.js';
import Light from './World/light.js';
import { GUI } from 'dat.gui';

let instance = null
let starto = false
export default class Experience {
    constructor(canvas) {
        if (instance) {
            return instance
        }

        instance = this
        this.canvas = canvas;
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene()
        this.debug = new Debug()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.environment = new Enviroment()
        this.light = new Light()
        this.world = new World()
        this.ground = new Ground()
        this.launcher = new LauncherModel()
        this.rocket = new RocketModel()
        this.screen2 = new ValueScreen()
        this.earth = new Earth()
        this.physics = new Physics()
        this.tree = new NatureModel()
        this.sizes.on('resize', () => {
            this.resize()
        })
        this.time.on('tick', () => {
            this.update()
        })



    }
    start() {
        console.log('start')
        this.debug.ui.destroy()
        starto = true
    }
    resize() {
        this.camera.resize()
        this.renderer.resize()
    }
    update() {

        this.camera.update()
        this.environment.update()
        this.renderer.update()
        this.world.update()
        this.light.update()
        this.ground.update()
        this.launcher.update()
        this.tree.update()
        this.screen2.update()
        if (starto == true) {
            this.rocket.update()

            this.physics.update()
        }

    }

}