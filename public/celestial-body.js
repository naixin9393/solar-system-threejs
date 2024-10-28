export class CelestialBody {
    constructor(name, radius) {
        this.name = name;
        this.radius = radius;
        this.satellites = []
    }
    
    satellites() {
        return this.satellites;
    }

    radius() {
        return this.radius;
    }

    addSatellite(satellite) {
        this.satellites.push(satellite);
    }

}