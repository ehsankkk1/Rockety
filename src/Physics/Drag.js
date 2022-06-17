import Atmospheric_properties from "./Atmosphere"
import Rocket from "./Rocket"
import { Vector3 } from "three"

let instance = null

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

    }
    DragForceChange() {
        var drag = new Vector3(0, -1, 0)
        this.drag = drag.multiplyScalar(
            this.rocket.drag_coefficient * this.rocket.A * (0.5) *
            this.atmosphere.rho * Math.pow(this.rocket.velocity.length(), 2)
        )
    }
    update() {
        this.atmosphere.update()
        this.DragForceChange()
            //console.log(this.drag)
    }
}