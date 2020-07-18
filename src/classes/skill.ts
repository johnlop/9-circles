import { Entity } from '../entities/entity';
import { Coordinates, Appearance } from '../components/components';

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

    public use(user, targetPosition) {
        const now = Date.now();
        if (now - this.skillLastUsed > this.rateOfFire) {
            if (this.isProjectile) {
                const bullet = new Entity();
                bullet.addComponent(new Coordinates());
                bullet.components['coordinates'].position = user.components.coordinates.position.clone();
                bullet.addComponent(new Appearance(bullet.components['coordinates'].position, 'bullet', false));
                bullet.components['coordinates'].speed = this.speed;
                bullet.components['coordinates'].direction = targetPosition.subtract(
                    bullet.components['coordinates'].position,
                );
            }
            this.skillLastUsed = now;
        }
    }
}
