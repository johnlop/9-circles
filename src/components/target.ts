export class Target {
    public name = 'target';
    public id: number;
    public range: number;
    public speed: number;

    public constructor(id: number, range: number, speed: number) {
        this.id = id;
        this.range = range;
        this.speed = speed;
    }
}
