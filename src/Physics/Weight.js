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
        this.weight_force = new Vector3(0, -1 * this.rocket.full_mass * this.earth.gravity_on_surface.length(), 0)
        this.current_gravity = this.earth.gravity_on_surface
    }
    weight_forceChange() {
        var weight_force = new Vector3(0, -1, 0)
        this.weight_force = weight_force.multiplyScalar(this.rocket.full_mass * this.current_gravity.length())
    }
    gravityChange() {
        let current_gravity = new Vector3(0, -1, 0)
        let rh = (this.earth.radius + this.rocket.height)
        this.current_gravity = current_gravity.multiplyScalar(this.earth.gravity_on_surface.length() * this.earth.radius).divideScalar(rh)
    }
    update() {
        this.gravityChange()
        this.weight_forceChange()
            //console.log(this.current_gravity)
    }
}