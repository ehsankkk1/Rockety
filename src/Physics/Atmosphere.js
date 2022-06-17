import Rocket from "./Rocket"

let instance = null
export default class Atmospheric_properties {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.currentPressure = 0
        this.current_temprature = 0
        this.rho = 0
        this.rocket = new Rocket()
        this.rhoChange()
    }

    pressureChange() {
        let h = this.rocket.height * 3.28

        if (h > 82345) {
            let a = (this.current_temprature + 459.7) / 389.98
            this.currentPressure = 51.97 * Math.pow(a, -11.388)
        } else if (h > 36152) {
            this.currentPressure = 473.1 * Math.exp(1.73 - 0.000048 * h)
        } else if (h <= 36152) {
            let a = (this.current_temprature + 459.7) / 518.6
            this.currentPressure = 2116 * Math.pow(a, 5.256)
        }
    }

    tempratureChange() {
        let h = this.rocket.height * 3.28
        if (h > 82345) {
            this.current_temprature = -205.05 + 0.00164 * h
        } else if (h > 36152) {
            this.current_temprature = -70
        } else if (h <= 36152) {
            this.current_temprature = 59 - 0.00356 * h
        }
    }

    rhoChange() {
        this.tempratureChange()
        this.pressureChange()
        this.rho = this.currentPressure / (1718 * (this.current_temprature + 459.7))
        this.rho = this.rho * 515.378818
    }

    update() {
        this.rhoChange()
            //onsole.log(this.rho)
    }

}