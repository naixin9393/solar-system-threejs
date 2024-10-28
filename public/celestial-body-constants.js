import { CelestialBody } from "./celestial-body.js";

export const CELESTIAL_BODIES = {
  SUN: new CelestialBody({
    name: "Sun",
    radius: 1,
    color: 0xffffff,
    distance: 0,
    period: 1,
    minorAxis: 0,
    majorAxis: 0
  }),

  EARTH: new CelestialBody({
    name: "Earth", 
    radius: 0.5, 
    color: 0xffff00, 
    distance: 2, 
    period: 365, 
    minorAxis: 1, 
    majorAxis: 1
  }),
  // moon = new CelestialBody("Moon", 0.05, 0xffff00,  0.5, 28, 1.2, 1);
  
  MOON: new CelestialBody({
    name: "Moon",
    radius: 0.05,
    color: 0xaaaaaa,
    distance: 0.5,
    period: 28,
    minorAxis: 3,
    majorAxis: 1
  })
}