import { removeEntity, addComponent, createEntity } from '../entities/entity';
import { state } from '../game';
import { scene } from '../main';
import { Appearance } from '../components/appearance';
import { Expiration } from '../components/expiration';

export enum Type {
    LASER = 1,
    WAVE = 2,
    GRENADE = 3,
}

export class Skill {
    public key: string;
    public type: Type;
    public skillLastUsed: number;
    public rateOfFire: number;
    public damage: number;
    public speed: number;
    public range: number;
    public accuracy: number;
    public nbProjectiles: number;

    public constructor(
        key: string,
        type: Type,
        rateOfFire: number,
        damage: number,
        range: number,
        accuracy: number,
        nbProjectiles: number,
    ) {
        this.key = key;
        this.type = type;
        this.skillLastUsed = Date.now();
        this.rateOfFire = rateOfFire;
        this.damage = damage;
        this.range = range;
        this.accuracy = accuracy / 10;
        this.nbProjectiles = nbProjectiles;
    }

    public use(userId: number, targetPosition: BABYLON.Vector3): void {
        const now = Date.now();
        if (now - this.skillLastUsed > this.rateOfFire) {
            if (this.type === Type.LASER) {
                targetPosition.y = 1;
                const position = state.cpts['coordinates'][userId].position.clone();
                position.y = 1;
                const direction = BABYLON.Vector3.Normalize(targetPosition.subtract(position));
                for (let i = 0; i < this.nbProjectiles; i++) {
                    shootStuff(this, position, direction);
                }
            }
            this.skillLastUsed = now;
        }
    }
}

const shootStuff = (skill: Skill, position, direction): void => {
    direction.rotateByQuaternionToRef(
        BABYLON.Quaternion.FromEulerAngles(0, (Math.random() - 0.5) / skill.accuracy, 0),
        direction,
    );
    direction.normalize();

    const ray = new BABYLON.Ray(position, direction, skill.range);

    const hit = scene.pickWithRay(ray, (mesh) => {
        if (mesh.name == state.heroId || (mesh.parent && mesh.parent.name == state.heroId)) {
            return false;
        }
        return true;
    });

    if (hit.pickedMesh) {
        const id = hit.pickedMesh.parent ? hit.pickedMesh.parent.name : hit.pickedMesh.name;
        if (state.cpts['vitals'][id]) {
            state.cpts['vitals'][id].life -= skill.damage;
            if (state.cpts['vitals'][id].life <= 0) {
                removeEntity(id);
            } else {
                if (state.cpts['appearance'][id].label) {
                    state.cpts['appearance'][id].label.text = state.cpts['vitals'][id].life.toString();
                }
            }
        }
    }

    const id = createEntity();
    const newPosition = position.add(direction.scale(skill.range / 2));
    const newTarget = position.add(direction.scale(skill.range));
    addComponent(
        new Appearance(id, newPosition, 'laser', { hasLabel: false, hasShadow: false, length: skill.range }),
        id,
    );
    (state.cpts['appearance'][id].mesh as BABYLON.Mesh).lookAt(newTarget);
    const exp = Date.now() + 200;
    addComponent(new Expiration(exp), id);
};
