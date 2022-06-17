
import dat from 'dat.gui';
import init from 'three-dat.gui'; // Import initialization method
init(dat);

export default class Debug
{
    constructor()
    {
        //this.active = window.location.hash === '#debug'
        this.active = true
        if(this.active) {this.ui = new dat.GUI()}
        
    }
}