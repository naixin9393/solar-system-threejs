import * as THREE from "three";

export const TEXTURES = {
  MERCURY: new THREE.TextureLoader().load("/assets/textures/mercury.jpg"),
  VENUS: new THREE.TextureLoader().load("/assets/textures/venus.jpg"),
  EARTH: new THREE.TextureLoader().load("/assets/textures/earth.jpg"),
  MARS: new THREE.TextureLoader().load("/assets/textures/mars.jpg"),
  JUPITER: new THREE.TextureLoader().load("/assets/textures/jupiter.jpg"),
  SATURN: new THREE.TextureLoader().load("/assets/textures/saturn.jpg"),
  URANUS: new THREE.TextureLoader().load("/assets/textures/uranus.jpg"),
  NEPTUNE: new THREE.TextureLoader().load("/assets/textures/neptune.jpg"),
  PLUTO: new THREE.TextureLoader().load("/assets/textures/pluto.jpg"),
  MOON: new THREE.TextureLoader().load("/assets/textures/moon.jpg"),
  EUROPA: new THREE.TextureLoader().load("/assets/textures/europa.webp"),
  TITAN: new THREE.TextureLoader().load("/assets/textures/titan.webp"),
  TRITON: new THREE.TextureLoader().load("/assets/textures/triton.webp"),
};

export const BUMP = {
  MERCURY: new THREE.TextureLoader().load("/assets/textures-bump/mercury.jpg"),
  VENUS: new THREE.TextureLoader().load("/assets/textures-bump/venus.jpg"),
  EARTH: new THREE.TextureLoader().load("/assets/textures-bump/earth.jpg"),
  MARS: new THREE.TextureLoader().load("/assets/textures-bump/mars.jpg"),
  MOON: new THREE.TextureLoader().load("/assets/textures-bump/moon.jpg"),
};

export const SPECULAR = {
  EARTH: new THREE.TextureLoader().load("/assets/textures-specular/earth.jpg"),
};
