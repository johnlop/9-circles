import { addComponent, createEntity } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { state } from '../game';

export class Skill {
    public key: string;
    public isProjectile: boolean;
    public skillLastUsed: number;
    public rateOfFire: number;
    public projNumber: number;
    public damage: number;
    public speed: number;
    public range: number;

    public constructor(key, isProjectile, rate, projNumber, damage, speed, range) {
        this.key = key;
        this.isProjectile = isProjectile;
        this.skillLastUsed = Date.now();
        this.rateOfFire = rate;
        this.projNumber = projNumber;
        this.damage = damage;
        this.speed = speed;
        this.range = range;
    }

    public use(userId, targetPosition) {
        const now = Date.now();
        if (now - this.skillLastUsed > this.rateOfFire) {
            if (this.isProjectile) {
                const id = createEntity();
                addComponent(
                    new Coordinates(
                        state.cpts['coordinates'][userId].position.clone(),
                        targetPosition.subtract(state.cpts['coordinates'][userId].position),
                        this.speed,
                    ),
                    id,
                );
                addComponent(new Appearance(state.cpts['coordinates'][id].position, false), id);
            }
            this.skillLastUsed = now;
        }
    }
}
