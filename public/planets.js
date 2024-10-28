import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CelestialBody } from "./celestial-body.js";

let scene, renderer;
let camera;
let info;
let grid;
let estrella,
  Planetas = [],
  Lunas = [];
let t0 = 0;
let accglobal = 0.001;
let timestamp;
let moon;
let earth;
let sun;

init();
animationLoop();

function init() {
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
  info.innerHTML = "three.js - sol y planetas";
  document.body.appendChild(info);

  //Defino cámara
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

  //Rejilla de referencia indicando tamaño y divisiones
  grid = new THREE.GridHelper(20, 40);
  //Mostrarla en vertical
  grid.geometry.rotateX(Math.PI / 2);
  grid.position.set(0, 0, 0.05);
  scene.add(grid);

  // sun = new CelestialBody("Sun", 1, 0xffff00, 0, 1, 0, 0);
  
  sun = new CelestialBody({
    name: "Sun",
    radius: 1,
    color: 0xffffff,
    distance: 0,
    period: 1,
    minorAxis: 0,
    majorAxis: 0
  })

  earth = new CelestialBody({
    name: "Earth", 
    radius: 0.5, 
    color: 0xffff00, 
    distance: 2, 
    period: 365, 
    minorAxis: 1, 
    majorAxis: 1
  });
  // moon = new CelestialBody("Moon", 0.05, 0xffff00,  0.5, 28, 1.2, 1);
  
  moon = new CelestialBody({
    name: "Moon",
    radius: 0.05,
    color: 0xaaaaaa,
    distance: 0.5,
    period: 28,
    minorAxis: 3,
    majorAxis: 1
  });


  sun.addSatellite(earth);
  earth.addSatellite(moon);
  
  sun.addToScene(scene);

  //Inicio tiempo
  t0 = Date.now();
}

//Bucle de animación
function animationLoop() {
  timestamp = (Date.now() - t0) * accglobal;

  requestAnimationFrame(animationLoop);

  sun.animate(timestamp, 0, 0);

  renderer.render(scene, camera);
}
