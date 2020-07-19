// Coordinates
export class Coordinates {
    public name = 'coordinates';
    public position: BABYLON.Vector3;
    public direction: BABYLON.Vector3;
    public speed: number;

    public constructor(position, direction, speed) {
        this.position = position;
        this.direction = direction;
        this.speed = speed;
    }
}
