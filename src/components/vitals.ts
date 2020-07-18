// Vitals
export class Vitals {
    public name = 'vitals';
    public life: number;
    public maxLife: number;

    public constructor(life) {
        this.life = life;
        this.maxLife = life;
    }
}
