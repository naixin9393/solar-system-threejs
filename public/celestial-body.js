import * as THREE from 'three';

export class CelestialBody {
    constructor(name, radius, color, distance, period, minorAxis, majorAxis) {
        this.name = name;
        this.radius = radius;
        this.color = color;
        this.distance = distance;
        this.period = period;
        this.minorAxis = minorAxis;
        this.majorAxis = majorAxis;
        
        this.satellites = []

        this.geometry = new THREE.SphereGeometry(radius, 20, 20);
        this.material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
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
    
    draw(scene) {
        scene.add(this.mesh);
        for (let satellite of this.satellites) {
            satellite.draw(scene);
        }
    }
    
    animate(timestamp, initialX, initialY) {
        for (let satellite of this.satellites) {
            satellite.animate(timestamp, this.mesh.position.x, this.mesh.position.y);
        }
        this.mesh.position.x = initialX + Math.sin(timestamp) * this.majorAxis;
        this.mesh.position.y = initialY + Math.cos(timestamp) * this.minorAxis;
    }
}