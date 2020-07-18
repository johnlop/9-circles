// Coordinates
export class Coordinates {
    public name = 'coordinates';
    public position: BABYLON.Vector3;
    public direction: BABYLON.Vector3;
    public speed: number;

    public constructor() {
        this.position = new BABYLON.Vector3(0, 0, 0);
        this.direction = new BABYLON.Vector3(0, 0, 0);
        this.speed = 0;
    }
}
