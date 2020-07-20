import { addComponent, createEntity, removeEntity } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { state } from '../game';
import { scene } from '../main';

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
                const position = state.cpts['coordinates'][userId].position.clone();
                const direction = BABYLON.Vector3.Normalize(targetPosition.subtract(position));
                position.y = 1;

                const ray = new BABYLON.Ray(position, direction, this.range);

                const rayHelper = new BABYLON.RayHelper(ray);
                rayHelper.show(scene);

                const hit = scene.pickWithRay(ray, (mesh) => {
                    if (mesh.name === state.heroId || (mesh.parent && mesh.parent.name === state.heroId)) {
                        return false;
                    }
                    return true;
                });

                if (hit.pickedMesh) {
                    const id = hit.pickedMesh.parent ? hit.pickedMesh.parent.name : hit.pickedMesh.name;
                    if (state.cpts['vitals'][id]) {
                        state.cpts['vitals'][id].life -= this.damage;
                        if (state.cpts['vitals'][id].life <= 0) {
                            removeEntity(id);
                        } else {
                            state.cpts['appearance'][id].label.text = state.cpts['vitals'][id].life.toString();
                        }
                    }
                }

                rayHelper.dispose();
            }
            this.skillLastUsed = now;
        }
    }
}
