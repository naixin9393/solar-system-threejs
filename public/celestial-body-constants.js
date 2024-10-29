import { CelestialBody } from "./celestial-body.js";
import { TEXTURES, BUMP, SPECULAR } from "./textures.js";

export const CELESTIAL_BODIES = {
  SUN: new CelestialBody({
    name: "Sun",
    radius: scale(300),
    distance: 0,
    orbitalPeriod: 1,
    spinPeriod: 1,
    minorAxis: 0,
    majorAxis: 0,
  }),

  MERCURY: new CelestialBody({
    name: "Mercury",
    radius: scale(4),
    distance: scale(350),
    orbitalPeriod: 88,
    spinPeriod: 59,
    minorAxis: 0.38,
    majorAxis: 0.39,
    texture: TEXTURES.MERCURY,
    textureBump: BUMP.MERCURY,
  }),

  VENUS: new CelestialBody({
    name: "Venus",
    radius: scale(9.5),
    distance: scale(730),
    orbitalPeriod: 225,
    spinPeriod: -243,
    minorAxis: 0.72,
    majorAxis: 0.72,
    texture: TEXTURES.VENUS,
    textureBump: BUMP.VENUS,
  }),

  EARTH: new CelestialBody({
    name: "Earth",
    radius: scale(10),
    color: 0xffffff,
    distance: scale(1000),
    orbitalPeriod: 365,
    spinPeriod: 1,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.EARTH,
    textureBump: BUMP.EARTH,
    textureSpecular: SPECULAR.EARTH,
    // texture: new THREE.TextureLoader().load("/assets/textures/earth.jpg"),
  }),

  MARS: new CelestialBody({
    name: "Mars",
    radius: scale(5.3),
    distance: scale(1550),
    orbitalPeriod: 687,
    spinPeriod: 1,
    minorAxis: 1.5,
    majorAxis: 1.5,
    texture: TEXTURES.MARS,
    textureBump: BUMP.MARS,
  }),

  JUPITER: new CelestialBody({
    name: "Jupiter",
    radius: scale(100),
    distance: scale(3000),
    orbitalPeriod: 4332,
    spinPeriod: 0.41,
    minorAxis: 5.2,
    majorAxis: 5.2,
    texture: TEXTURES.JUPITER,
  }),

  SATURN: new CelestialBody({
    name: "Saturn",
    radius: scale(90),
    distance: scale(5000),
    orbitalPeriod: 10759,
    spinPeriod: 0.45,
    minorAxis: 9.5,
    majorAxis: 9.5,
    texture: TEXTURES.SATURN,
  }),

  URANUS: new CelestialBody({
    name: "Uranus",
    radius: scale(40),
    distance: scale(7000),
    orbitalPeriod: 30687,
    spinPeriod: -0.72,
    minorAxis: 19.2,
    majorAxis: 19.2,
    texture: TEXTURES.URANUS,
  }),

  NEPTUNE: new CelestialBody({
    name: "Neptune",
    radius: scale(38),
    distance: scale(10000),
    orbitalPeriod: 60190,
    spinPeriod: 0.67,
    minorAxis: 30.05,
    majorAxis: 30.05,
    texture: TEXTURES.NEPTUNE,
  }),

  PLUTO: new CelestialBody({
    name: "Pluto",
    radius: scale(2),
    distance: scale(12000),
    orbitalPeriod: 90560,
    spinPeriod: -6.39,
    minorAxis: 39.48,
    majorAxis: 39.48,
  }),

  MOON: new CelestialBody({
    name: "Moon",
    radius: scale(3),
    distance: scale(120),
    orbitalPeriod: 28,
    spinPeriod: 28,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.MOON,
    textureBump: BUMP.MOON,
  }),

  EUROPA: new CelestialBody({
    name: "Europa",
    radius: scale(2.5),
    distance: scale(300),
    orbitalPeriod: 200,
    spinPeriod: 3.5,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.EUROPA,
  }),

  TITAN: new CelestialBody({
    name: "Titan",
    radius: scale(4),
    distance: scale(400),
    orbitalPeriod: 300,
    spinPeriod: 16,
    minorAxis: 1,
    majorAxis: 1,
    TEXTURES: TEXTURES.TITAN,
  }),

  TRITON: new CelestialBody({
    name: "Triton",
    radius: scale(2),
    distance: scale(200),
    orbitalPeriod: 100,
    spinPeriod: -6,
    minorAxis: 1,
    majorAxis: 1,
    TEXTURES: TEXTURES.TRITON,
  }),
};

function scale(distance) {
  return distance / 100;
}
