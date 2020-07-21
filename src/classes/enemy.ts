import { createEntity, addComponent } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { Target } from '../components/target';
import { state } from '../game';
import { Vitals } from '../components/vitals';

export const createEnemy = function (mesh, targetId) {
    const id = createEntity();
    const position = new BABYLON.Vector3(Math.random() * 100 - 50, 0, Math.random() * 100 - 50);
    addComponent(new Coordinates(position, null, 5), id);
    addComponent(new Appearance(id, state.cpts['coordinates'][id].position, true, mesh, true), id);
    addComponent(new Vitals(100), id);
    addComponent(new Target(targetId), id);
    return id;
};
