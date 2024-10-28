import * as THREE from 'three';

const baseSpeed = 30;

export class CelestialBody {
    constructor({name, radius, color, distance, period, minorAxis, majorAxis}) {
        this.name = name;
        this.radius = radius;
        this.color = color;
        this.distance = distance;
        this.period = period;
        this.minorAxis = minorAxis;
        this.majorAxis = majorAxis;
        
        this.satellites = []

        this.geometry = new THREE.SphereGeometry(radius, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.initializeOrbit();
    }
    
    satellites() {
        return this.satellites;
    }

    radius() {
        return this.radius;
    }

    addSatellite(satellite) {
        this.satellites.push(satellite);
    }
    
    initializeOrbit() {
        let curve = new THREE.EllipseCurve(
            0,
            0,
            this.majorAxis * this.distance,
            this.minorAxis * this.distance,
        );
        let points = curve.getPoints(100);
        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        let material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.orbit = new THREE.Line(geometry, material);
    }
    
    addToScene(scene) {
        scene.add(this.mesh);
        scene.add(this.orbit);
        for (let satellite of this.satellites) {
            satellite.addToScene(scene);
        }
    }
    
    animate(timestamp, initialX, initialY) {
        this.mesh.position.x = initialX + Math.sin(timestamp * baseSpeed / this.period) * this.distance * this.majorAxis;
        this.mesh.position.y = initialY + Math.cos(timestamp * baseSpeed / this.period) * this.distance * this.minorAxis;
        for (let satellite of this.satellites) {
            satellite.animate(timestamp, this.mesh.position.x, this.mesh.position.y);
        }
        if (this.orbit) {
            this.orbit.position.x = initialX;
            this.orbit.position.y = initialY;
        }
    }
}