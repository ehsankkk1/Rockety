import { Vector3 } from "three"
let instance = null
export default class Earth {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.gravity_on_surface = new Vector3(0, -9.82, 0) //gravitational acceleration
        this.radius = 6378100.0 //meters 
        this.G = 6.67 * 10 ^ -11 //Universal Gravitation constant in n*m^2/kg^2
        this.mass = 5.98 * 10 ^ 24 // kilograms
    }
}