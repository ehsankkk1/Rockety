import Atmospheric_properties from "./Atmosphere"
import Rocket from "./Rocket"
import { Vector3 } from "three"

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

    }
    LiftForceChange() {
        var lift = new Vector3()
        lift = lift.multiplyScalar(
            this.rocket.lift_coefficient * this.rocket.A * (0.5) *
            this.atmosphere.rho * this.rocket.velocity.length()
        )
        this.lift = lift
    }
    update() {
        this.LiftForceChange()
    }
}