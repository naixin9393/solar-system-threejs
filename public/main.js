import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { CelestialBody } from "./celestial-body.js";
import { CELESTIAL_BODIES } from "./celestial-body-constants.js";

import FakeGlowMaterial from "./fake-glow.js";

let scene;
let renderer;
let camera;
let info;
let grid;
let t0 = 0;
let accglobal = 0.001;
let timestamp;
let camcontrols;
let lightAmbient;
let lightPoint;

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
  //setGrid();
  setSolarSystem();
  setLight();
  setGui();
  t0 = Date.now();
}

function animationLoop() {
  timestamp = (Date.now() - t0) * accglobal;

  requestAnimationFrame(animationLoop);

  SUN.animate(timestamp, 0, 0);

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
  const gui = new GUI();
  const ambientLightFolder = gui.addFolder("Luz ambiente");
  ambientLightFolder
    .add(lightAmbient, "intensity", 0, 1, 0.1)
    .name("Intensidad");
  ambientLightFolder
    .addColor(lightAmbient, "color")
    .name("Color")
    .onChange((value) => lightAmbient.color.set(value));
  ambientLightFolder.open();
}

function setCamera() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 10);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camcontrols = new OrbitControls(camera, renderer.domElement);
}

function setLight() {
  lightAmbient = new THREE.AmbientLight(0xffffff, 0.3);
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
