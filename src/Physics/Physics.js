import * as THREE from 'three'
import { Vector3 } from 'three';

import Weight from './Weight'
import Drag from './Drag'
import Lift from './Lift'
import Thrust from './Thrust'
import Rocket from './Rocket'
import Atmospheric_properties from './Atmosphere'

let instance = null
export default class Physics {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.dt = 0.1
        this.t = 0.1
        this.weight = new Weight()
        this.drag = new Drag()
        this.lift = new Lift()
        this.thrust = new Thrust()
        this.total_force = new Vector3(0, 0, 0)
        this.rocket = new Rocket()
        this.atmosphere = new Atmospheric_properties()
    }
    totalForce() {
        let T_f = new Vector3(0, 0, 0)
        T_f.add(this.thrust.thrust_force)
        T_f.add(this.weight.weight_force)
        T_f.add(this.drag.drag)
        T_f.add(this.lift.lift)
        this.total_force.copy(T_f)
            //console.log(this.drag.drag)

    }
    acceleration() {
        let a = new Vector3()
        a.copy(this.total_force)
        a.divideScalar(this.rocket.full_mass)
            // a.add(this.total_force)
            // a.multiplyScalar(1/this.rocket.full_mass)
        this.rocket.acceleration.copy(a)
    }
    velocity() {
        let v = this.rocket.acceleration
            // dv.add(this.rocket.acceleration)
            // dv.divideScalar(this.dt)
            // this.rocket.velocity.add(dv)

        this.rocket.velocity.add(v.multiplyScalar(this.dt))
    }
    location() {
        let d = new Vector3()
        d.copy(this.rocket.velocity)
        d.multiplyScalar(this.dt)
        this.rocket.position.add(d)
            // dd.divideScalar(this.dt)
            // this.rocket.position.add(dd)
        this.rocket.height = this.rocket.position.y
            // console.log(this.rocket.height)
            //console.log(this.rocket.position)
            //console.log(this.rocket.acceleration)
            // console.log(this.rocket.velocity.)
            // console.log(this.rocket.velocity.angleTo(new Vector3(1, 0, 0)))

        //console.log(this.rocket.position)

    }

    angularAcc() {
        let angular_acc = new Vector3()
        angular_acc.copy(this.drag.drag)
        angular_acc.add(this.lift.lift)
        let div = this.rocket.full_mass
        angular_acc.divideScalar(div * (this.rocket.diameter / 2))
        this.rocket.angularAcc.copy(angular_acc)
    }
    applyTorque() {
        let f = new Vector3(0, 0, 0)
        f.addVectors(this.drag.drag, this.lift.lift)
        let angle = f.angleTo(new Vector3(0, 1, 0))
        this.rocket.angle_of_attack = angle
        if (this.rocket.velocity.y < 10000) {
            var matrix = new THREE.Matrix4()
            matrix.makeRotationY(-angle)
            this.rocket.position.applyMatrix4(matrix)
        }


        // console.log(angle)

    }

    angularAcceleration() {
        this.rocket.angularAcceleration.copy(this.rocket.acceleration)
        this.rocket.angularAcceleration.divideScalar((this.rocket.diameter / 2))
        let angularVelocity = new Vector3()
        angularVelocity.copy(this.rocket.angularAcceleration)
        angularVelocity.multiplyScalar(this.dt)
        this.rocket.angularVelocity.add(angularVelocity)

        let angular = new Vector3()
        angular.copy(this.rocket.angularVelocity)
        angular.multiplyScalar(this.dt)
        this.rocket.angular.add(angular)
        console.log(this.rocket.angular)

    }


    update() {
        // if (this.t > 2 && this.rocket.velocity.y > 0 && this.atmosphere.layer != 'outside the atmosphere') {
        //     this.rocket.update()
        //     this.weight.update()
        //     this.thrust.update()
        //     this.drag.update()
        //     this.lift.update()
        //     this.totalForce()
        //     this.acceleration()
        //     this.velocity()
        //     this.location()
        //     this.time_update()
        //     this.angularAcc()
        //     this.applyTorque()
        //     this.angularAcceleration()
        // } else if (this.t < 2) {
        //     this.rocket.update()
        //     this.weight.update()
        //     this.thrust.update()
        //     this.drag.update()
        //     this.lift.update()
        //     this.totalForce()
        //     this.acceleration()
        //     this.velocity()
        //     this.location()
        //     this.angularAcc()
        //     this.applyTorque()
        //     this.time_update()
        //         //this.angularAcceleration()
        // }
        this.rocket.update()
        this.weight.update()
        this.thrust.update()
        this.drag.update()
        this.lift.update()
        this.totalForce()
        this.acceleration()
        this.velocity()
        this.location()
        this.time_update()
        this.angularAcc()
        this.applyTorque()
        this.angularAcceleration()

    }

    time_update() {
        this.t = this.t + this.dt
    }
}


// var airResistanceForceChange = () => {
//     //NOTE : air resistance depends on velocity so at the liftoff of the rocket there is no airResistance.
//     //Returns a force magnitude in Newtons
//     var airResistance_force = new Vector3()
//     airResistance_force.addVectors(LiftForceChange(), DragForceChange())
//     return airResistance_force
// }


// // while (rocket.fuel_mass > 0) {
// //     rocket.velocity = rocket.velocity + dm / (rocket.dry_mass + rocket.fuel_mass) * (-rocket.exhaust_velocity)
// //     rocket.position = rocket.position + rocket.velocity * dt
// //     t = t + dt
// // }

// // var fuel_mass_change = () => {
// //     var dm = thrust.burn_rate * dt //amount of mass lost in time dt
// //     var current_fuel_mass = rocket.fuel_mass - dm
// //     rocket.fuel_mass = current_fuel_mass
// //     return current_fuel_mass
// // }
// var velocityChange = (fuel_mass) => {
//     //rocket equation
//     const dry_mass = rocket.structural_mass + rocket.payload_mass
//     let current_velocity = new Vector3(1, 1, 1)
//     current_velocity.add(thrust.exhaust_velocity)
//     const mass_ratio = (fuel_mass) / dry_mass
//     current_velocity.multiplyScalar(Math.log(mass_ratio))
//         // rocket.velocity.set(current_velocity)
//     return current_velocity;
// }

// // implementing acceleration change 
// var getAccelerationVector = () => {
//     //  ps : in 2d
//     //  ax = thrust * sin(thrustangle) / mass
//     //  ay = -g + thrust * cos(thrustangle) / mass.
//     const vector = new Vector3(0, 1, 0).applyQuaternion(thrustAngle)
//     const scale = new Vector3(0, 1, 0).multiplyScalar(thrust / mass)
//     const gravity = gravityChange
//     const mult = new Vector3().multiplyVectors(vector, scale)
//     const final = mult.add(gravity)
//     return final
// };
// const v0 = new Vector3(0, 0, 0);

// var getNetForce = (velocity) => {
//     let netForce = new Vector3(0, 1, 0)
//     netForce.add(thrustForceChange())
//     netForce.sub(weight_forceChange())
//     netForce.sub(DragForceChange(velocity))
//     netForce.sub(DragForceChange(velocity))


//     return netForce
// }
// show flames only when: (t > 0) && (burn_rate > 0)