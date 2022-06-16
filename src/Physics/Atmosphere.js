import Rocket from "./Rocket"

let instance = null
export default class Atmospheric_properties {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.pressure = {
            P0: 101325, //Pascal Pressure at time 0
            currentPressure: 100000.0,
            R: 8.3144621, // Joules/Kelvin*Mole 
            M: 0.02896 // kg/mole

        }
        this.temprature = {
            lapse_rate: 0.0065, // K/m
            T0: 288.0, //Kelvin  Temperature at time 0
            current_temprature: 0
        }
        this.rho = 0
        this.rocket = new Rocket()
        this.rhoChange()
    }

    pressureChange() {
        if (this.rocket.height > 25098.76) {
            this.pressure.currentPressure = 51.97 * ((this.temprature.current_temprature + 456.9) / 389.98) ^ 5.256
        } else if (this.rocket.height > 11019.13) {
            let h = this.rocket.height * 3.28
            this.pressure.currentPressure = 473.1 * Math.exp(1.73 - 0.000048 * h)
        } else if (this.rocket.height <= 11019.13) {
            this.pressure.currentPressure = 2116 * ((this.temprature.current_temprature + 456.9) / 518.6) ^ -11.388
        }
    }

    tempratureChange() {
        let h = this.rocket.height * 3.28
        if (this.rocket.height > 25098.76) {
            this.temprature.current_temprature = -205.05 + 0.00164 * h
        } else if (this.rocket.height > 11019.13) {
            this.temprature.current_temprature = -70
        } else if (this.rocket.height <= 11019.13) {
            this.temprature.current_temprature = 59 - 0.00356 * h
        }
    }

    rhoChange() {
        this.tempratureChange()
        this.pressureChange()
        this.rho = this.pressure.currentPressure / (1718 * (this.temprature.current_temprature + 459.7))
    }

    update() {
        this.rhoChange()
    }

}