import * as THREE from "three";
import { CSS2DObject } from "https://cdn.jsdelivr.net/npm/three/examples/jsm/renderers/CSS2DRenderer.js";

const baseSpeed = 30;

export class CelestialBody {
  constructor({
    label,
    radius,
    distance,
    orbitalPeriod,
    spinPeriod,
    minorAxis,
    majorAxis,
    texture = undefined,
    textureBump = undefined,
    textureSpecular = undefined,
    name
  }) {
    this.name = name;
    this.radius = radius;
    this.distance = distance;
    this.orbitalPeriod = orbitalPeriod;
    this.spinPeriod = spinPeriod;
    this.minorAxis = minorAxis;
    this.majorAxis = majorAxis;
    this.texture = texture;
    this.textureBump = textureBump;
    this.textureSpecular = textureSpecular;

    this.satellites = [];

    this.geometry = new THREE.SphereGeometry(this.radius, 20, 20);
    this.material = new THREE.MeshPhongMaterial({ color: 0xffffff });

    if (this.texture != undefined) {
      this.material.map = this.texture;
    }

    if (this.textureBump != undefined) {
      this.material.bumpMap = this.textureBump;
      this.material.bumpScale = 3;
    }

    if (this.textureSpecular != undefined) {
      this.material.specularMap = this.textureSpecular;
      this.material.specular = new THREE.Color("grey");
    }

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.createLabel(label, this.radius + 0.7);

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
    const points = curve.getPoints(360);

    const xzPoints = points.map(
      (point) => new THREE.Vector3(point.x, 0, point.y)
    );
    const geometry = new THREE.BufferGeometry().setFromPoints(xzPoints);
    let material = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.orbit = new THREE.Line(geometry, material);
  }
  
  updateOrbit(scene) {
    scene.remove(this.orbit);
    this.initializeOrbit();
    scene.add(this.orbit);
  }

  addToScene(scene) {
    scene.add(this.mesh);
    scene.add(this.orbit);
    for (let satellite of this.satellites) {
      satellite.addToScene(scene);
    }
  }
  
  updateMesh(scene) {
    scene.remove(this.mesh);
    
    this.geometry = new THREE.SphereGeometry(this.radius, 20, 20);
    this.material = new THREE.MeshPhongMaterial({ color: 0xffffff });

    if (this.texture != undefined) {
      this.material.map = this.texture;
    }

    if (this.textureBump != undefined) {
      this.material.bumpMap = this.textureBump;
      this.material.bumpScale = 3;
    }

    if (this.textureSpecular != undefined) {
      this.material.specularMap = this.textureSpecular;
      this.material.specular = new THREE.Color("grey");
    }

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.mesh);
  }
  
  removeFromScene(scene) {
    scene.remove(this.mesh);
    scene.remove(this.orbit);
    for (let satellite of this.satellites) {
      satellite.removeFromScene(scene);
    }
  }

  animate(timestamp, parentX, parentZ, camera) {
    this.mesh.position.x =
      parentX +
      Math.sin((timestamp * baseSpeed) / this.orbitalPeriod) *
        this.distance *
        this.majorAxis;

    this.mesh.position.z =
      parentZ +
      Math.cos((timestamp * baseSpeed) / this.orbitalPeriod) *
        this.distance *
        this.minorAxis;

    this.mesh.rotation.y = (timestamp / this.spinPeriod) * 50;
      
    const distanceToCamera = this.mesh.position.distanceTo(camera.position);
    const scaleFactor = Math.min(1 / (distanceToCamera * distanceToCamera), 0.1);
      this.label.element.style.fontSize = `${scaleFactor * 180}px`;

    for (let satellite of this.satellites) {
      satellite.animate(timestamp, this.mesh.position.x, this.mesh.position.z, camera);
    }

    if (this.orbit) {
      this.orbit.position.x = parentX;
      this.orbit.position.z = parentZ;
    }
  }

  createLabel(text, y) {
    if (this.label) {
      this.mesh.remove(this.label);
    }
    const labelDiv = document.createElement("div");
    labelDiv.style.maxWidth = "700px";
    // labelDiv.textContent = text;
    let p = document.createElement("p");
    p.textContent = text;
    p.style.whiteSpace = "pre-line";
    labelDiv.appendChild(p);
    this.label= new CSS2DObject(labelDiv);
    this.label.position.y = y;
    this.mesh.add(this.label);
  }
}
