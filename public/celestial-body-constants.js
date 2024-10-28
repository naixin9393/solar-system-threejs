import { CelestialBody } from "./celestial-body.js";

export const CELESTIAL_BODIES = {
  SUN: new CelestialBody({
    name: "Sun",
    radius: scale(100),
    color: 0xffffff,
    distance: 0,
    period: 1,
    minorAxis: 0,
    majorAxis: 0,
  }),

  MERCURY: new CelestialBody({
    name: "Mercury",
    radius: scale(4),
    color: 0xc4c4c4,
    distance: scale(350),
    period: 88,
    minorAxis: 1,
    majorAxis: 1,
  }),

  VENUS: new CelestialBody({
    name: "Venus",
    radius: scale(9.5),
    color: 0xf5deb3,
    distance: scale(730),
    period: 225,
    minorAxis: 1,
    majorAxis: 1,
  }),

  EARTH: new CelestialBody({
    name: "Earth",
    radius: scale(10),
    color: 0x1e90ff,
    distance: scale(1000),
    period: 365,
    minorAxis: 1,
    majorAxis: 1,
  }),

  MARS: new CelestialBody({
    name: "Mars",
    radius: scale(5.3),
    color: 0xff4500,
    distance: scale(1550),
    period: 687,
    minorAxis: 1,
    majorAxis: 1,
  }),
	
  JUPITER: new CelestialBody({
	name: "Jupiter",
	radius: scale(110),
	color: 0xd9b89b,
	distance: scale(3000),
	period: 4332,
	minorAxis: 1,
	majorAxis: 1,
  }),

  SATURN: new CelestialBody({
	name: "Saturn",
	radius: scale(90),
	color: 0xe3c292,
	distance: scale(5000),
	period: 10759,
	minorAxis: 1,
	majorAxis: 1,
  }),

  URANUS: new CelestialBody({
	name: "Uranus",
	radius: scale(40),
	color: 0x5fb0e8,
	distance: scale(7000),
	period: 30687,
	minorAxis: 1,
	majorAxis: 1,
  }),

  NEPTUNE: new CelestialBody({
	name: "Neptune",
	radius: scale(38),
	color: 0x4b0082,
	distance: scale(10000),
	period: 60190,
	minorAxis: 1,
	majorAxis: 1,
  }),

  PLUTO: new CelestialBody({
	name: "Pluto",
	radius: scale(2),
	color: 0xb0c4de,
	distance: scale(12000),
	period: 90560,
	minorAxis: 1,
	majorAxis: 1,
  }),


  MOON: new CelestialBody({
    name: "Moon",
    radius: scale(3),
    color: 0xd9d9d9,
    distance: scale(120),
    period: 28,
    minorAxis: 1,
    majorAxis: 1,
  }),
	
  EUROPA: new CelestialBody({
	name: "Europa",
	radius: scale(2.5),
	color: 0x8b4513,
	distance: scale(300),
	period: 3.5,
	minorAxis: 1,
	majorAxis: 1,
  }),
	
  TITAN: new CelestialBody({
	name: "Titan",
	radius: scale(4),
	color: 0x8b4513,
	distance: scale(400),
	period: 3.5,
	minorAxis: 1,
	majorAxis: 1,
  }),
	
  TRITON: new CelestialBody({
	name: "Triton",
	radius: scale(2),
	color: 0x8b4513,
	distance: scale(200),
	period: 3.5,
	minorAxis: 1,
	majorAxis: 1,
  }),
};

function scale(distance) {
  return distance / 300;
}
