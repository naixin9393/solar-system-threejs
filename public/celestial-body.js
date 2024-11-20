import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

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
    name,
    material = undefined,
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
    if (material) {
      this.material = material;
    } else {
      this.material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    }

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
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.createLabel(label, this.radius + 0.7);

    this.initializeOrbit();
  }

  setRing(innerRing, outerRing, textureRing) {
    textureRing.wrapS = THREE.RepeatWrapping;
    textureRing.wrapT = THREE.RepeatWrapping;
    textureRing.repeat.set(1, 1);
    textureRing.rotation = Math.PI / 2;

    const ringGeometry = new THREE.RingGeometry(
      innerRing * this.radius,
      outerRing * this.radius,
      64
    );

    const uv = ringGeometry.attributes.uv.array;
    for (let i = 0; i < uv.length; i += 2) {
      const x = uv[i] - 0.5;
      const y = uv[i + 1] - 0.5;
      const angle = Math.atan2(y, x);
      const radius = Math.sqrt(x * x + y * y);
      uv[i] = angle / (2 * Math.PI) + 0.5;
      uv[i + 1] = radius;
    }

    ringGeometry.attributes.uv.needsUpdate = true;

    const ringMaterial = new THREE.MeshPhongMaterial({
      map: textureRing,
      side: THREE.DoubleSide,
      transparent: true,
    });

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.rotation.y = Math.PI / 5;

    ring.castShadow = true;

    this.mesh.add(ring);
    this.ring = ring;
    return this;
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
      this.minorAxis * this.distance
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

  updateMesh(scene, timestamp) {
    scene.remove(this.mesh);

    this.geometry = new THREE.SphereGeometry(this.radius, 20, 20);

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
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    
    this.mesh.position.x =
    Math.sin((timestamp * baseSpeed) / this.orbitalPeriod) *
      this.distance *
      this.majorAxis;

  this.mesh.position.z =
    Math.cos((timestamp * baseSpeed) / this.orbitalPeriod) *
      this.distance *
      this.minorAxis;
    
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
    const scaleFactor = Math.min(
      1 / (distanceToCamera * distanceToCamera),
      0.1
    );
    this.label.element.style.fontSize = `${scaleFactor * 180}px`;

    for (let satellite of this.satellites) {
      satellite.animate(
        timestamp,
        this.mesh.position.x,
        this.mesh.position.z,
        camera
      );
    }

    if (this.orbit) {
      this.orbit.position.x = parentX;
      this.orbit.position.z = parentZ;
    }

    if (this.ring) {
      // this.ring.rotation.z = this.mesh.rotation.y + 1;
      this.ring.lookAt(0, 1000, 0);
    }
  }

  createLabel(text, y) {
    if (this.label) {
      this.label.element.remove();
      this.mesh.remove(this.label);
    }
    const labelDiv = document.createElement("div");
    labelDiv.style.maxWidth = "700px";
    // labelDiv.textContent = text;
    let p = document.createElement("p");
    p.textContent = text;
    p.style.whiteSpace = "pre-line";
    labelDiv.appendChild(p);
    this.label = new CSS2DObject(labelDiv);
    this.label.position.y = y;
    this.mesh.add(this.label);
  }
}
