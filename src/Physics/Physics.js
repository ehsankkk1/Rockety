import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { Clock, Vector3 } from 'three'


export default class Physics {
    constructor() {

    }
}


/*variables
 *
 *
 */
//The rocket that is going to be used for the launch has the following properties:
const rocket = {
    structural_mass: 137000,
    fuel_mass: 330000, //kg    
    payload_mass: 140.000,
    diameter: 10.1, //m
    height: 110.6, //m
    velocity: new Vector3(0, 0, 0),
    position: new Vector3(0, 0, 0),
    acceleration: new Vector3(0, 0, 0),
    angle: 0,
    torque: 0,
    angularVelocity: 0,
    A: 10.0, //m^2 Reference area or cross sectional area (of the front of the rocket)
    drag_coefficient: 0.447, //drag coefficient//  0.237 to 0.447
    lift_coefficient: 1.1,

}
const thrust = {
    exhaust_velocity: new Vector3(0, 3200, 0), //2.1 to 3.2 km/s  for solid propellants
    thrust_time: 0.1,
    burn_rate: 12890, // kg per sec
    rho: 0.7, //Density 
    A: 8, // nozzle throat area
    Ae: 4.55, //m^2  nozzle exit area
    pt: 680000, // pascal  (pressure inside burning room)
    pe: 100000 // pressure on the exit nozzle / between 0.1 and 0.2


}
const earth = {

    gravity_on_surface: new Vector3(0, 9.82, 0), //gravitational acceleration
    radius: 6378100.0, //meters 
    G: 6.67 * 10 ^ -11, //Universal Gravitation constant in n*m^2/kg^2
    mass: 5.98 * 10 ^ 24, // kilograms

}
const pressure = {
    P0: 101325, //Pascal Pressure at time 0
    currentPressure: 100000.0,
    R: 8.3144621, // Joules/Kelvin*Mole 
    M: 0.02896 // kg/mole

}
const temprature = {
        lapse_rate: 0.0065, // K/m
        T0: 288.0, //Kelvin  Temperature at time 0
        current_temprature: 0
    }
    /*GUI
     *
     */
const gui = new dat.GUI()
gui.add(thrust, "burn_rate", 12890, 15000).onFinishChange(function(value) {
    rocket.burn_rate = value;
    console.log(rocket.burn_rate)
});
gui.add(rocket, "payload_mass", 1200, 12500).onFinishChange(function(value) {
    rocket.payload_mass = value;
    console.log(rocket.payload_mass)
});

gui.add(thrust, "thrust_time").onFinishChange(function(value) {
    thrust.thrust_time = value;
    console.log(thrust.thrust_time)
});

/*physic laws
 *
 *
 */
//var thrust_force= acceleration*rocket_mass
//var Burn_rate = dm/dt   // dm represents the mass of the fuel ejected from the rocket during the time interval dt
//var Ft = burn_rate*exhaust_velocity
//var  delta_rocket_impulse = burn_rate *exhaust_velocity * dt

var LiftForceChange = (velocity) => {
    var lift = new Vector3()
    var mult = new Vector3()
    lift = lift.multiplyScalar(rocket.lift_coefficient * rocket.A * (0.5) * thrust.rho)
    mult.multiplyVectors(velocity, velocity)
    lift.multiply(mult)
    return lift
}
var DragForceChange = (velocity) => {
    var drag = new Vector3()
    var mult = new Vector3()
    drag = drag.multiplyScalar(rocket.drag_coefficient * rocket.A * (0.5) * thrust.rho)
    mult.multiplyVectors(velocity, velocity)
    drag.multiply(mult)
    return drag
}
var airResistanceForceChange = () => {
    //NOTE : air resistance depends on velocity so at the liftoff of the rocket there is no airResistance.
    //Returns a force magnitude in Newtons
    var airResistance_force = new Vector3()
    airResistance_force.addVectors(LiftForceChange(), DragForceChange())
    return airResistance_force
}
var thrustForceChange = () => {
    // Fthrust = (m dot * V)e + (pe - p0) * Ae
    // m_dot = velocity* rho *Ae  which is the mass flow rate (mass per unit time) 
    let thrust_force = new Vector3(0, 1, 0) // should be around 33000000 N
    let m_dot = new Vector3(0, 1, 0)
    m_dot.multiplyScalar(thrust.rho * thrust.Ae)
    m_dot.multiply(thrust.exhaust_velocity)
    let mult = new Vector3(0, 1, 0)
    mult.multiplyVectors(m_dot, thrust.exhaust_velocity)
    thrust_force.addScalar((thrust.pe - pressure.P0) * thrust.Ae)
    thrust_force.add(mult)
    return thrust_force //it varies depending on the pressure on the nozzle between 32608372 and 33100000
}

var weight_forceChange = () => {
    var weight_force = new Vector3(0, 1, 0)
    var dry_mass = rocket.structural_mass + rocket.payload_mass
    var full_mass = dry_mass + rocket.fuel_mass
    weight_force = weight_force.multiplyScalar(full_mass).multiply(earth.gravity_on_surface)
    return weight_force
}
var tempratureChange = () => {
    temprature.current_temprature = temprature.T0 - temprature.lapse_rate * rocket.height
    return temprature.current_temprature
}
var gravityChange = () => {
    let current_gravity = new Vector3(0, 1, 0)
    const rh = (earth.radius + rocket.height) ^ 2
    current_gravity = current_gravity.multiplyScalar(earth.G * earth.mass).divideScalar(rh)
    return current_gravity
}
var pressureChange = (current_temprature) => {
    pressure.currentPressure = pressure.P0 * (temprature.current_temprature / temprature.T0) ^ ((earth.gravity_on_surface * pressure.M) / (pressure.R * temprature.lapse_rate))
}

const dt = 0.01
var t = 0


// while (rocket.fuel_mass > 0) {
//     rocket.velocity = rocket.velocity + dm / (rocket.dry_mass + rocket.fuel_mass) * (-rocket.exhaust_velocity)
//     rocket.position = rocket.position + rocket.velocity * dt
//     t = t + dt
// }

var fuel_mass_change = () => {
    var dm = thrust.burn_rate * dt //amount of mass lost in time dt
    var current_fuel_mass = rocket.fuel_mass - dm
    rocket.fuel_mass = current_fuel_mass
    return current_fuel_mass
}
var velocityChange = (fuel_mass) => {
    //rocket equation
    const dry_mass = rocket.structural_mass + rocket.payload_mass
    let current_velocity = new Vector3(1, 1, 1)
    current_velocity.add(thrust.exhaust_velocity)
    const mass_ratio = (fuel_mass) / dry_mass
    current_velocity.multiplyScalar(Math.log(mass_ratio))
        // rocket.velocity.set(current_velocity)
    return current_velocity;
}

// implementing acceleration change 
var getAccelerationVector = () => {
    //  ps : in 2d
    //  ax = thrust * sin(thrustangle) / mass
    //  ay = -g + thrust * cos(thrustangle) / mass.
    const vector = new Vector3(0, 1, 0).applyQuaternion(thrustAngle)
    const scale = new Vector3(0, 1, 0).multiplyScalar(thrust / mass)
    const gravity = gravityChange
    const mult = new Vector3().multiplyVectors(vector, scale)
    const final = mult.add(gravity)
    return final
};
const v0 = new Vector3(0, 0, 0);

var getNetForce = (velocity) => {
    let netForce = new Vector3(0, 1, 0)
    netForce.add(thrustForceChange())
    netForce.sub(weight_forceChange())
    netForce.sub(DragForceChange(velocity))
    netForce.sub(DragForceChange(velocity))


    return netForce
}

// const velocityChange = function (v0,dt) {
// const NetForce = getNetForce()
// currentVelocity = new Vector3(0,1,0)
// currentVelocity = netForce.multiplyScalar(dt)
// currentVelocity.addScalar(rocket.velocity)
// return currentVelocity
// }


// show flames only when:   ( t>0) && ( burn_rate >0)

//scene
const scene = new THREE.Scene()


//red cube

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5, 5, 5, 5)
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh);


//sizes

const sizes = {
    height: window.innerHeight,
    width: window.innerWidth
}

//camera 

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4
mesh.position.y = -1.5;
var vector = new THREE.Vector3(1, 0, 0);
vector.applyQuaternion(10);


scene.add(camera)

//renderer
const canvas = document.querySelector('.webgl')
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas

})
renderer.setSize(sizes.width, sizes.height)

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
//Clock
const clock = new THREE.Clock();

//Animation
const draw = () => {
    const fuel_mass = fuel_mass_change()
    const velocity = velocityChange(fuel_mass)
    const DragForce = DragForceChange(velocity)
    const weight_force = weight_forceChange()
    const thrustForce = thrustForceChange()
    const currentNetForce = getNetForce(velocity)
    const LiftForce = LiftForceChange(velocity)
    console.log(velocity)
    console.log(currentNetForce)
    console.log(thrustForce)
    console.log(weight_force)
    console.log(LiftForce)


}

const tick = () => {
    //Update project

    //mesh.position.y +=Math.av(force.y) * 0.0001

    camera.lookAt(mesh.position)

    //Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
    //setInterval(function(){ 
    //this code runs every second 

//}, 1000);
draw()