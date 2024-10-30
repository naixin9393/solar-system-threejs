import { CelestialBody } from "./celestial-body.js";
import { TEXTURES, BUMP, SPECULAR } from "./textures.js";
import { LABEL } from "./label.js";

export const CELESTIAL_BODIES = {
  SUN: new CelestialBody({
    name: "Sun",
    radius: scale(100),
    distance: 0,
    orbitalPeriod: 1,
    spinPeriod: 1,
    minorAxis: 1,
    majorAxis: 1,
    label: LABEL.SUN,
  }),

  MERCURY: new CelestialBody({
    name: "Mercury",
    radius: scale(4),
    distance: scale(350),
    orbitalPeriod: 88,
    spinPeriod: 59,
    minorAxis: 0.97,
    majorAxis: 1,
    texture: TEXTURES.MERCURY,
    textureBump: BUMP.MERCURY,
    label: LABEL.MERCURY,
  }),

  VENUS: new CelestialBody({
    name: "Venus",
    radius: scale(9.5),
    distance: scale(730),
    orbitalPeriod: 225,
    spinPeriod: -243,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.VENUS,
    textureBump: BUMP.VENUS,
    label: LABEL.VENUS,
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
    label: LABEL.EARTH,
  }),

  MARS: new CelestialBody({
    name: "Mars",
    radius: scale(5.3),
    distance: scale(1550),
    orbitalPeriod: 687,
    spinPeriod: 1,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.MARS,
    textureBump: BUMP.MARS,
    label: LABEL.MARS,
  }),

  JUPITER: new CelestialBody({
    name: "Jupiter",
    radius: scale(100),
    distance: scale(3000),
    orbitalPeriod: 4332,
    spinPeriod: 0.41,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.JUPITER,
    label: LABEL.JUPITER,
  }),

  SATURN: new CelestialBody({
    name: "Saturn",
    radius: scale(90),
    distance: scale(5000),
    orbitalPeriod: 10759,
    spinPeriod: 0.45,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.SATURN,
    label: LABEL.SATURN,
  }),

  URANUS: new CelestialBody({
    name: "Uranus",
    radius: scale(40),
    distance: scale(4000),
    orbitalPeriod: 30687,
    spinPeriod: -0.72,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.URANUS,
    label: LABEL.URANUS,
  }),

  NEPTUNE: new CelestialBody({
    name: "Neptune",
    radius: scale(38),
    distance: scale(10000),
    orbitalPeriod: 60190,
    spinPeriod: 0.67,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.NEPTUNE,
    label: LABEL.NEPTUNE,
  }),

  PLUTO: new CelestialBody({
    name: "Pluto",
    radius: scale(2),
    distance: scale(12000),
    orbitalPeriod: 90560,
    spinPeriod: -6.39,
    minorAxis: 1,
    majorAxis: 1,
    label: LABEL.PLUTO,
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
    label: LABEL.MOON,
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
    label: LABEL.EUROPA,
  }),

  TITAN: new CelestialBody({
    name: "Titan",
    radius: scale(4),
    distance: scale(400),
    orbitalPeriod: 300,
    spinPeriod: 16,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.TITAN,
    label: LABEL.TITAN,
  }),

  TRITON: new CelestialBody({
    name: "Triton",
    radius: scale(2),
    distance: scale(200),
    orbitalPeriod: 100,
    spinPeriod: -6,
    minorAxis: 1,
    majorAxis: 1,
    texture: TEXTURES.TRITON,
    label: LABEL.TRITON,
  }),
};

function scale(distance) {
  return distance / 40;
}
