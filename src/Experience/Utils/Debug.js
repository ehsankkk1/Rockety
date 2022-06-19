import dat from 'dat.gui';
import init from 'three-dat.gui'; // Import initialization method
init(dat);

let instance = null
export default class Debug {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
            //this.active = window.location.hash === '#debug'
        this.active = true
        if (this.active) { this.ui = new dat.GUI() }

    }
}