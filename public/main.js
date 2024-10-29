import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { CelestialBody } from "./celestial-body.js";
import { CELESTIAL_BODIES } from "./celestial-body-constants.js";

import { flyControls, mapControls } from "./cameraControls.js";

import FakeGlowMaterial from "./fake-glow.js";

let accglobal = 0.001;
let camera;
let cameraFolder;
let cameraToggleControl;
let flyCameraMode;
let cameraControls;
let flyCameraControls;
let mapCameraControls;
let grid;
let gui;
let info;
let lightAmbient;
let lightPoint;
let renderer;
let scene;
let t0 = 0;
let timestamp;

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
  setTitle("Solar System");
  setCamera();
  // setGrid();
  setSolarSystem();
  setLight();
  setControls();
  setGui();
  t0 = Date.now();
}

function animationLoop() {
  timestamp = (Date.now() - t0) * accglobal;

  requestAnimationFrame(animationLoop);

  SUN.animate(timestamp, 0, 0);

  cameraControls.update(1);

  renderer.render(scene, camera);
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
  cameraFolder = gui.addFolder("Camera");
  cameraToggleControl = cameraFolder
    .add(flyCameraMode, "enabled")
    .name("Fly mode")
    .onChange(() => {
      cameraControls.enabled = false;
      cameraControls =
        cameraControls === mapCameraControls
          ? flyCameraControls
          : mapCameraControls;
      cameraControls.enabled = true;
    })
    .listen();
  // Create a new div element for the instruction text
  const instructionText = document.createElement("div");
  instructionText.style.marginTop = "10px";
  instructionText.style.color = "#fff";
  instructionText.style.fontFamily = "Monospace";
  instructionText.innerHTML = "Press spacebar or click here to toggle camera";

  // Append the instruction text to the GUI
  gui.domElement.appendChild(instructionText);
}

function setCamera() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  mapCameraControls = mapControls(camera, renderer.domElement);
  flyCameraControls = flyControls(camera, renderer.domElement);
  cameraControls = mapCameraControls;
  flyCameraMode = {
    enabled: false,
  };
}

function setLight() {
  lightAmbient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(lightAmbient);

  lightPoint = new THREE.PointLight(0xffffff, 1, 0, 1);
  lightPoint.position.set(0, 0, 0);
  lightPoint.visible = true;
  scene.add(lightPoint);
}

function setGrid() {
  grid = new THREE.GridHelper(20, 40);
  grid.geometry.rotateX(Math.PI / 2);
  grid.position.set(0, 0, 0.05);
  scene.add(grid);
}

function setSun() {
  const material = new FakeGlowMaterial({
    falloff: 0.1,
    glowInternalRadius: 3.0,
    glowColor: new THREE.Color("#ffffff"),
    glowSharpness: 0.5,
    opacity: 1,
    side: THREE.FrontSide,
    depthTest: true,
  });

  SUN.material = material;
  SUN.mesh = new THREE.Mesh(SUN.geometry, SUN.material);

  SUN.addToScene(scene);

  const pointLight = new THREE.PointLight(0xffffff, 5, 0, 0.3);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);
}

function setControls() {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case " ":
        toggleCamera(camera, renderer.domElement);
        break;
    }
  });
}

function toggleCamera() {
  cameraControls.enabled = false;
  cameraControls =
    cameraControls === mapCameraControls
      ? flyCameraControls
      : mapCameraControls;
  cameraControls.enabled = true;
  cameraToggleControl.object.enabled = !cameraToggleControl.object.enabled;
}
