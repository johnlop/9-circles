import { removeEntity, addComponent, createEntity } from '../entities/entity';
import { state } from '../game';
import { scene } from '../main';
import { Appearance } from '../components/appearance';
import { Expiration } from '../components/expiration';

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
                targetPosition.y = 1;
                const position = (state.cpts['coordinates'][userId].position as BABYLON.Vector3).clone();
                position.y = 1;
                const direction = BABYLON.Vector3.Normalize(targetPosition.subtract(position));
                direction.rotateByQuaternionToRef(new BABYLON.Quaternion((Math.random() - 1) / 4, 0, 0, 0), direction);

                const ray = new BABYLON.Ray(position, direction, this.range);

                const hit = scene.pickWithRay(ray, (mesh) => {
                    if (mesh.name === state.heroId || (mesh.parent && mesh.parent.name === state.heroId)) {
                        return false;
                    }
                    return true;
                });

                const rayHelper = new BABYLON.RayHelper(ray);
                // rayHelper.show(scene);

                if (hit.pickedMesh) {
                    const id = hit.pickedMesh.parent ? hit.pickedMesh.parent.name : hit.pickedMesh.name;
                    if (state.cpts['vitals'][id]) {
                        state.cpts['vitals'][id].life -= this.damage;
                        if (state.cpts['vitals'][id].life <= 0) {
                            removeEntity(id);
                        } else {
                            if (state.cpts['appearance'][id].label) {
                                state.cpts['appearance'][id].label.text = state.cpts['vitals'][id].life.toString();
                            }
                        }
                    }
                }

                // const id = createEntity();
                // const newpos = position.addInPlace(direction.scale(50));
                // addComponent(new Appearance(id, position, 'laser', { hasLabel: false, hasShadow: false }), id);
                // (state.cpts['appearance'][id].mesh as BABYLON.Mesh)
                //     .rotateAround(position, BABYLON.Vector3.Up(), Math.random() / 10)
                //     .lookAt(targetPosition);
                // (state.cpts['appearance'][id].mesh as BABYLON.Mesh)
                //     .lookAt(targetPosition);
                // const orientation = BABYLON.Vector3.RotationFromAxis(direction, null, null);
                // (state.cpts['appearance'][id].mesh as BABYLON.Mesh).rotation = direction;
                // const exp = Date.now() + 300;
                // addComponent(new Expiration(exp), id);

                const line = BABYLON.MeshBuilder.CreateLines('', { points: [position, targetPosition] });
            }
            this.skillLastUsed = now;
        }
    }
}
