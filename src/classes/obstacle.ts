import { createEntity, addComponent } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { Vitals } from '../components/vitals';

export const createObstacle = function (meshName, position) {
    const id = createEntity();
    addComponent(new Coordinates(position), id);
    addComponent(new Appearance(id, position, meshName, { hasLabel: false, hasShadow: true }), id);
    addComponent(new Vitals(30), id);
    return id;
};
