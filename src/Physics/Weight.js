import { Vector3 } from "three"
import Earth from "./Earth"
import Rocket from "./Rocket"
let instance = null
export default class Weight {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.rocket = new Rocket()
        this.earth = new Earth()
        this.weight_force = new Vector3(0, this.rocket.full * this.earth.gravity_on_surface, 0)
        this.current_gravity = this.earth.gravity_on_surface
    }
    weight_forceChange() {
        var weight_force = new Vector3(0, 1, 0)
        weight_force = weight_force.multiplyScalar(this.rocket.full_mass).multiply(this.current_gravity)
        this.weight_force = weight_force
    }
    gravityChange() {
        let current_gravity = new Vector3(0, 1, 0)
        const rh = (this.earth.radius + this.rocket.height)
        current_gravity = current_gravity.multiplyScalar(this.g0 * this.earth.radius).divideScalar(rh)
        this.current_gravity = current_gravity
    }
    update() {
        this.gravityChange()
        this.weight_forceChange()
    }
}