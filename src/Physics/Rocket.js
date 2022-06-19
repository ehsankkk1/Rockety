import { Vector3 } from "three"
import Thrust from "./Thrust"

let instance = null
export default class Rocket {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.structural_mass = 137000
        this.fuel_mass = 33000 //kg    
        this.payload_mass = 140.000
        this.full_mass = this.fuel_mass + this.structural_mass + this.payload_mass
        this.diameter = 10.1 //m
        this.height_r = 110.6 //m
        this.height = 0 //m
        this.velocity = new Vector3(0, 0, 0)
        this.position = new Vector3(0, 0, 0)
        this.acceleration = new Vector3(0, 0, 0)
        this.angle = 0
        this.torque = 0
        this.angularVelocity = 0
        this.A = 10.0 //m^2 Reference area or cross sectional area (of the front of the rocket)
        this.drag_coefficient = 0.447 //drag coefficient//  0.237 to 0.447
        this.lift_coefficient = 1.1
        this.angle_of_attack = 0
        this.angularAcc = new Vector3(0, 0, 0)
        this.thrust = new Thrust()
        this.mass_change()
    }

    mass_change() {
        if (this.fuel_mass > 0) {
            var dm = this.thrust.burn_rate * 0.1 //amount of mass lost in time dt
            var current_fuel_mass = this.fuel_mass - dm
            this.fuel_mass = current_fuel_mass
            this.full_mass = this.fuel_mass + this.structural_mass + this.payload_mass
        } else {
            this.full_mass = this.structural_mass + this.payload_mass
        }

    }
    update() {
        this.mass_change()
    }
}