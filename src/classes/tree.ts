import { createEntity, addComponent } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { Vitals } from '../components/vitals';

export const createTree = function (mesh) {
    const id = createEntity();
    const position = new BABYLON.Vector3(Math.random() * 100 - 50, 0, Math.random() * 100 - 50);
    addComponent(new Coordinates(position, BABYLON.Vector3.Zero(), 0), id);
    addComponent(new Appearance(id, position, false, mesh, true), id);
    addComponent(new Vitals(30), id);
    return id;
};