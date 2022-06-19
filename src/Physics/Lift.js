import Atmospheric_properties from "./Atmosphere"
import Rocket from "./Rocket"
import { Vector3, Vector4 } from "three"

let instance = null

export default class Lift {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.rocket = new Rocket()
        this.atmosphere = new Atmospheric_properties()
        this.LiftForceChange()
        this.angle = 90

    }
    LiftForceChange() {
        var lift = this.rocket.lift_coefficient * this.rocket.A * (0.5) * this.atmosphere.rho * Math.pow(this.rocket.velocity.length(), 2)
        this.angle = (90) * (Math.PI / 180)
        this.angle += this.rocket.velocity.angleTo(new Vector3(1, 0, 0))

        this.lift = new Vector3(lift * Math.cos(this.angle), Math.sin(this.angle), 0)
            // console.log(this.lift)
            // console.log()
    }
    update() {
        this.LiftForceChange()
    }
}