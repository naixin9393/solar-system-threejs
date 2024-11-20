import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { CelestialBody } from "./celestial-body.js";
import { CELESTIAL_BODIES } from "./celestial-body-constants.js";

import { flyControls, mapControls } from "./camera-controls.js";

import FakeGlowMaterial from "./fake-glow.js";
import { CelestialShaderMaterial } from "./shader-material.js";

import { LABEL } from "./label.js";

import { CSS2DRenderer,CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

let accglobal = 0.0003;
let addedObjects = [];
const defaultObjectProperties = {
  name: "Celestial Body",
  radius: 0.2,
  distance: 12,
  orbitalPeriod: 100,
  spinPeriod: 1,
  minorAxis: 1,
  majorAxis: 1,
  label: "Celestial Body",
};
let addObjectControls;
let camera;
let cameraFolder;
let cameraToggleControl;
let cameraMode;
let cameraControls;
let cancelAddObjectControls;
let confirmAddObjectControls;
let flyCameraControls;
let mapCameraControls;
let newObjectFolder;
let gui;
let info;
let inAddingMode = false;
let lightAmbient;
let lightPoint;
let paused = false;
let pauseTime;
let plane;
let raycaster = new THREE.Raycaster();
let renderer;
let scene;
let t0;
let timestamp;
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0";
labelRenderer.domElement.style.pointerEvents = "none";
labelRenderer.domElement.style.font = "12px Monospace";
labelRenderer.domElement.style.color = "#fff";
document.body.appendChild(labelRenderer.domElement);

// Star
const SUN = CELESTIAL_BODIES.SUN;

// Planets
const MERCURY = CELESTIAL_BODIES.MERCURY;
const VENUS = CELESTIAL_BODIES.VENUS;
const EARTH = CELESTIAL_BODIES.EARTH;
const MARS = CELESTIAL_BODIES.MARS;
const JUPITER = CELESTIAL_BODIES.JUPITER;
const SATURN = CELESTIAL_BODIES.SATURN;
const URANUS = CELESTIAL_BODIES.URANUS;
const NEPTUNE = CELESTIAL_BODIES.NEPTUNE;
const PLUTO = CELESTIAL_BODIES.PLUTO;

const EUROPA = CELESTIAL_BODIES.EUROPA;

const TITAN = CELESTIAL_BODIES.TITAN;

const TRITON = CELESTIAL_BODIES.TRITON;

const MOON = CELESTIAL_BODIES.MOON;

init();
animationLoop();

function init() {
  setTitle("Solar System | 1s = 5-6 days");
  setPlane();
  setCamera();
  setSolarSystem();
  setLight();
  setControls();
  setGui();
  pauseTime = 0;
  t0 = Date.now();
}

function animationLoop() {
  requestAnimationFrame(animationLoop);
  cameraControls.update(1);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  if (paused) {
    timestamp = pauseTime;
  } else {
    timestamp = (Date.now() - t0) * accglobal;
  }
  SUN.animate(timestamp, 0, 0, camera);
}

function setSolarSystem() {
  SUN.addSatellite(MERCURY);
  SUN.addSatellite(VENUS);
  SUN.addSatellite(EARTH);
  SUN.addSatellite(MARS);
  SUN.addSatellite(JUPITER);
  SUN.addSatellite(SATURN);
  SUN.addSatellite(URANUS);
  SUN.addSatellite(NEPTUNE);
  SUN.addSatellite(PLUTO);

  EARTH.addSatellite(MOON);

  JUPITER.addSatellite(EUROPA);

  SATURN.addSatellite(TITAN);

  NEPTUNE.addSatellite(TRITON);

  setSun();
}

function setTitle(title) {
  info = document.createElement("div");
  info.style.position = "absolute";
  info.style.top = "30px";
  info.style.width = "100%";
  info.style.textAlign = "center";
  info.style.color = "#fff";
  info.style.fontWeight = "bold";
  info.style.backgroundColor = "transparent";
  info.style.zIndex = "1";
  info.style.fontFamily = "Monospace";
  info.innerHTML = title;
  document.body.appendChild(info);
}

function setGui() {
  gui = new GUI();
  setCameraGui(gui);
  setShortcutsGui(gui);
  setObjectGui(gui);
}

function setObjectGui(gui) {
  const celestialBodiesControl = gui.addFolder("Celestial Bodies");
  addObjectControls = celestialBodiesControl
    .add({ addObject }, "addObject")
    .name("Add Object");
  confirmAddObjectControls = celestialBodiesControl
    .add({ confirmAddObject }, "confirmAddObject")
    .name("Confirm Add Object")
    .disable();
  cancelAddObjectControls = celestialBodiesControl
    .add({ cancelAddObject }, "cancelAddObject")
    .name("Cancel Add Object")
    .disable();
}

function createNewObjectFolder(object) {
  let folder = gui.addFolder("Properties");
  folder
    .add(object, "name")
    .name("Name")
    .onChange((value) => {
      object.createLabel(value, object.radius + 0.7);
    });
  folder
    .add(object, "radius", 0.1, 4)
    .name("Radius")
    .onChange(() => {
      object.updateMesh(scene, timestamp);
    });
  folder
    .add(object, "distance", 5, 80)
    .name("Distance")
    .onChange(() => {
      object.updateOrbit(scene);
    });
  folder.add(object, "orbitalPeriod", 10, 1400).name("Orbital Period");
  folder.add(object, "spinPeriod", 0.3, 100).name("Spin Period");
  folder
    .add(object, "minorAxis", 0.5, 4)
    .name("Minor Axis")
    .onChange(() => object.updateOrbit(scene));
  folder
    .add(object, "majorAxis", 0.5, 4)
    .name("Major Axis")
    .onChange(() => object.updateOrbit(scene));
  return folder;
}

function addObject() {
  togglePause();
  cameraControls.enabled = false;
  addObjectControls.disable();
  cancelAddObjectControls.enable();
  window.addEventListener("mousedown", addObjectEvent);
}

function confirmAddObject() {
  togglePause();
  window.removeEventListener("mousedown", addObjectEvent);
  cancelAddObjectControls.disable();
  addObjectControls.enable();
  confirmAddObjectControls.disable();
  inAddingMode = false;
}

function cancelAddObject() {
  togglePause();
  if (inAddingMode) {
    addedObjects.pop().removeFromScene(scene);
    newObjectFolder.destroy();
  }
  cameraControls.enabled = true;
  cancelAddObjectControls.disable();
  addObjectControls.enable();
  confirmAddObjectControls.disable();
  window.removeEventListener("mousedown", addObjectEvent);
  inAddingMode = false;
}

function addObjectEvent() {
  const mouse = {
    x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
  };
  cameraControls.enabled = true;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(plane);

  if (intersects.length > 0) {
    let newObject = Object.assign({}, defaultObjectProperties);
    inAddingMode = true;
    confirmAddObjectControls.enable();
    window.removeEventListener("mousedown", addObjectEvent);
    const intersectionPoint = intersects[0].point;
    
    newObject.material = new CelestialShaderMaterial();

    let celestialBody = new CelestialBody(newObject);

    newObjectFolder = createNewObjectFolder(celestialBody);

    SUN.addSatellite(celestialBody);

    celestialBody.addToScene(scene);
    SUN.animate(timestamp, 0, 0, camera);

    addedObjects.push(celestialBody);
    console.log(addedObjects);
  }
}

function setCameraGui(gui) {
  cameraFolder = gui.addFolder("Camera");
  cameraToggleControl = cameraFolder
    .add(cameraMode, "mode", ["Fly", "Map"])
    .name("Camera mode: ")
    .onChange(() => {
      cameraControls.enabled = false;
      cameraControls =
        cameraControls === mapCameraControls
          ? flyCameraControls
          : mapCameraControls;
      cameraControls.enabled = true;
    })
    .listen();
}

function setShortcutsGui(gui) {
  let shortcutsFolder = gui.addFolder("Instructions");
  let shortcuts = {
    "Toggle Camera Mode": "T",
    "Pause / Resume": "Space",
  };
  shortcutsFolder.add(shortcuts, "Toggle Camera Mode").disable();
  shortcutsFolder.add(shortcuts, "Pause / Resume").disable();
}

function setCamera() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(10, 5, 30);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  mapCameraControls = mapControls(camera, renderer.domElement);
  flyCameraControls = flyControls(camera, renderer.domElement);
  cameraControls = mapCameraControls;
  cameraMode = {
    mode: "Map",
  };
}

function setLight() {
  lightAmbient = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(lightAmbient);

  lightPoint = new THREE.PointLight(0xffffff, 1, 0, 1);
  lightPoint.position.set(0, 0, 0);
  lightPoint.visible = true;
  scene.add(lightPoint);
}

function setPlane() {
  scene = new THREE.Scene();
  let geometry = new THREE.PlaneGeometry(1000, 1000);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = Math.PI / 2;
  plane.visible = false;
  scene.add(plane);
}

function setSun() {
  const material = new FakeGlowMaterial({
    falloff: 0.1,
    glowInternalRadius: 13.0,
    glowColor: new THREE.Color("#fafafa"),
    glowSharpness: 0.5,
    opacity: 1,
    side: THREE.FrontSide,
    depthTest: true,
  });

  SUN.material = material;
  SUN.mesh = new THREE.Mesh(SUN.geometry, SUN.material);
  SUN.createLabel(LABEL.SUN, SUN.radius * 0.7);

  SUN.addToScene(scene);

  const pointLight = new THREE.PointLight(0xffffff, 5, 0, 0.4);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);
}

function setControls() {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "t":
        toggleCamera(camera, renderer.domElement);
        break;

      case " ":
        togglePause();
        break;
    }
  });
}

function togglePause() {
  if (paused) {
    t0 = Date.now() - pauseTime / accglobal;
  } else {
    pauseTime = (Date.now() - t0) * accglobal;
  }
  paused = !paused;
}

function toggleCamera() {
  cameraControls.enabled = false;
  cameraControls =
    cameraControls === mapCameraControls
      ? flyCameraControls
      : mapCameraControls;
  cameraControls.enabled = true;
  cameraToggleControl.object.mode =
    cameraControls === mapCameraControls ? "Map" : "Fly";
}
