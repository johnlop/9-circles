import { Entity } from '../entities/entity';

// Target
export class Target {
    public name = 'target';
    public entity: Entity;

    public constructor(target) {
        this.entity = target;
    }
}
