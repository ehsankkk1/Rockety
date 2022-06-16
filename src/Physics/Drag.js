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
        this.DragForceChange()

    }
    DragForceChange() {
        var drag = new Vector3()
        drag = drag.multiplyScalar(
            this.rocket.drag_coefficient * this.rocket.A * (0.5) *
            this.atmosphere.rho * this.rocket.velocity.length()
        )
        this.drag = drag
    }
    update() {
        this.DragForceChange()
    }
}