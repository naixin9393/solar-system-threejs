import * as THREE from "three";
import { FlyControls } from "three/addons/controls/FlyControls.js";
import { MapControls } from "three/addons/controls/MapControls.js";

export function flyControls(camera, dom) {
  const controls = new FlyControls(camera, dom);
  controls.movementSpeed = 0.1;
  controls.domElement = dom;
  controls.rollSpeed = 0.004;
  controls.autoForward = false;
  controls.dragToLook = false;
  return controls;
}

export function mapControls(camera, dom) {
  const controls = new MapControls(camera, dom);
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.ROTATE,
  };
  return controls;
}
