import { Vector3 } from "three"
import Atmospheric_properties from "./Atmosphere"
import Physics from "./Physics"
import Rocket from "./Rocket"
let instance = null
export default class Thrust {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.exhaust_velocity = new Vector3(0, 4550, 0) //2.1 to 3.2 km/s  for solid propellants
        this.thrust_time = 192.6
        this.burn_rate = 12890 // kg per sec
        this.A_throat = 8 // nozzle throat area
        this.Ae = 4.55 //m^2  nozzle exit area
        this.pt = 680000 // pascal  (pressure inside burning room)
        this.pe = 100000 // pressure on the exit nozzle / between 0.1 and 0.2
        this.p0 = 101325
        this.fuel_type = 'O2H2'
        this.y = 1.2
        this.R = 8.3144621
        this.Tt = 3251 //K
        this.m_dot = ((this.A_throat * this.pt) / Math.sqrt(this.Tt)) * (Math.sqrt(this.y / this.R)) * (Math.pow(((this.y + 1) / 2), (-1 * (this.y + 1) / (2 * (this.y - 1)))));

        this.thrust_force = new Vector3(0, 50000, 0)
        this.atmospheric_properties = new Atmospheric_properties()
        this.rocket = new Rocket()
        this.p_v = this.rocket.velocity
        this.p_m = this.rocket.full_mass
        this.physics = new Physics()
        this.angle = 90
    }

    fuelChange() {
        if (this.fuel_type == 'O2H2') {
            this.exhaust_velocity = new Vector3(0, 4550, 0)
            this.Tt = 3251 //K
        } else if (this.fuel_type == 'O2RPI') {
            this.exhaust_velocity = new Vector3(0, 3580, 0)
            this.Tt = 3701 //K
        } else if (this.fuel_type == 'F2H2') {
            this.exhaust_velocity = new Vector3(0, 4790, 0)
            this.Tt = 4258 //K
        } else if (this.fuel_type == 'N2O4MMH') {
            this.exhaust_velocity = new Vector3(0, 3420, 0)
            this.Tt = 3398 //K
        } else if (this.fuel_type == 'N2O4N2H4UDMH') {
            this.exhaust_velocity = new Vector3(0, 3420, 0)
            this.Tt = 3369 //K
        }
    }

    thrustForceChange() {
        if (this.rocket.fuel_mass > 0) {
            let thrust_force = new Vector3(0, 0, 0) // should be around 33000000 N
            let mult = new Vector3(0, 0, 0)
            mult.add(this.exhaust_velocity)
            mult.multiplyScalar(this.m_dot)
            thrust_force.add(mult)
            thrust_force.addScalar((this.pe - this.p0) * this.Ae)
            this.thrust_force = thrust_force //it varies depending on the pressure on the nozzle between 32608372 and 33100000
        } else {
            this.thrust_force = new Vector3(0, 0, 0)
        }
    }

    update() {
        this.thrustForceChange()
        this.fuelChange()
            //console.log(this.thrust_force)
    }
}