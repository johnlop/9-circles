export class Target {
    public name = 'target';
    public id: number;
    public range: number;
    public speed: number;

    public constructor(id, range, speed) {
        this.id = id;
        this.range = range;
        this.speed = speed;
    }
}
