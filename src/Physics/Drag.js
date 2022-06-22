import Atmospheric_properties from "./Atmosphere"
import Rocket from "./Rocket"
import { Vector3 } from "three"

let instance = null
const IAMCONST = 'constValue'
const PI = 3.14
export default class Drag {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.rocket = new Rocket()
        this.atmosphere = new Atmospheric_properties()
        this.drag = new Vector3(0, -1, 0)
        this.DragForceChange()
        this.angle = 180
    }
    DragForceChange() {
        var drag = this.rocket.drag_coefficient * this.rocket.A * (0.5) * this.atmosphere.rho * Math.pow(this.rocket.velocity.length(), 2)
        this.angle = (180) * (Math.PI / 180)
        this.angle += this.rocket.velocity.angleTo(new Vector3(1, 0, 0))

        this.drag = new Vector3(drag * Math.cos(this.angle), drag * Math.sin(this.angle), 0)
            // console.log(this.drag)
            // console.log(this.angle)
    }
    update() {
        this.atmosphere.update()
        this.DragForceChange()
            //console.log(this.drag)
    }
}