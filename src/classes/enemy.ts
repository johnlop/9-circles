import { createEntity, addComponent } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { Target } from '../components/target';
import { state } from '../game';
import { Vitals } from '../components/vitals';

export const createEnemy = function (meshName, position, targetId) {
    const id = createEntity();
    addComponent(new Coordinates(position), id);
    addComponent(
        new Appearance(id, state.cpts['coordinates'][id].position, meshName, { hasLabel: false, hasShadow: true }),
        id,
    );
    addComponent(new Vitals(100), id);
    addComponent(new Target(targetId, 50, 5), id);
    return id;
};
