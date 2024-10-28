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
        
        this.label = createLabel(name, this.mesh.position);
        
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
        scene.add(this.label);
        for (let satellite of this.satellites) {
            satellite.addToScene(scene);
        }
    }
    
    animate(timestamp, initialX, initialY) {
        this.mesh.position.x = initialX + Math.sin(timestamp * baseSpeed / this.period) * this.distance * this.majorAxis;
        this.mesh.position.y = initialY + Math.cos(timestamp * baseSpeed / this.period) * this.distance * this.minorAxis;
        this.label.position.x = initialX + Math.sin(Math.PI / 180 + timestamp * baseSpeed / this.period) * this.distance * this.majorAxis;
        this.label.position.y = initialY + Math.cos(Math.PI / 180 + timestamp * baseSpeed / this.period) * this.distance * this.minorAxis;
        for (let satellite of this.satellites) {
            satellite.animate(timestamp, this.mesh.position.x, this.mesh.position.y);
        }
        if (this.orbit) {
            this.orbit.position.x = initialX;
            this.orbit.position.y = initialY;
        }
    }
}

function createLabel(text, position) {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas size
    const fontSize = 32;
    canvas.width = 200;
    canvas.height = 100;

    // Draw background (optional)
    context.fillStyle = 'rgba(255, 255, 255, 0)'; // white background with transparency
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    context.font = `${fontSize}px Arial`;
    context.fillStyle = 'white'; // text color
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Draw text
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Create texture from canvas
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    // Create sprite material
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });

    // Create sprite and set position
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position); // Set the position from the celestial body
    sprite.scale.set(0.04, 0.02, 1); // Scale the sprite to the desired size

    return sprite;
}