import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CelestialBody } from "./celestial-body.js";
import { CELESTIAL_BODIES } from "./celestial-body-constants.js";

let scene, renderer;
let camera;
let info;
let grid;
let t0 = 0;
let accglobal = 0.001;
let timestamp;

const SUN = CELESTIAL_BODIES.SUN;
const EARTH = CELESTIAL_BODIES.EARTH;
const MOON = CELESTIAL_BODIES.MOON;

init();
animationLoop();

function init() {
  setTitle("Solar System");
  setCamera();
  setGrid();

  SUN.addSatellite(EARTH);
  EARTH.addSatellite(MOON);
  SUN.addToScene(scene);

  //Inicio tiempo
  t0 = Date.now();
}

//Bucle de animación
function animationLoop() {
  timestamp = (Date.now() - t0) * accglobal;

  requestAnimationFrame(animationLoop);

  SUN.animate(timestamp, 0, 0);

  renderer.render(scene, camera);
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

  let camcontrols = new OrbitControls(camera, renderer.domElement);
}

function setGrid() {
  grid = new THREE.GridHelper(20, 40);
  grid.geometry.rotateX(Math.PI / 2);
  grid.position.set(0, 0, 0.05);
  scene.add(grid);
}