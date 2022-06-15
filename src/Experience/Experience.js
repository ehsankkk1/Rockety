import * as THREE from 'three'
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import World from './World/World.js';
import Ground from './World/Ground.js';
import RocketModel from './World/Rocket_model.js';
import TreeModel from './World/tree_model.js';
import ValueScreen from './World/value_screen.js';

let instance = null

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
        this.camera = new Camera()

        this.renderer = new Renderer()
        this.world = new World()
        this.ground = new Ground()
        this.rocket = new RocketModel()
        this.screen2 = new ValueScreen()
        this.tree = new TreeModel(8, 0)
        this.tree1 = new TreeModel(14, -8)
        this.tree2 = new TreeModel(-9, 0)
        this.tree3 = new TreeModel(-19, -8)
        this.tree4 = new TreeModel(-27, 10)
        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('tick', () => {
            this.update()
        })

    }
    resize() {
        this.camera.resize()
        this.renderer.resize()
    }
    update() {
        
        this.camera.update()
        this.renderer.update()
        this.world.update()
        this.ground.update()
        this.rocket.update()
        this.tree.update()
        this.screen2.update()

    }
}