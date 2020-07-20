import { createEntity, addComponent } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { Vitals } from '../components/vitals';
import { Skill } from './skill';
import { state } from '../game';

export const createHero = function (mesh) {
    const id = createEntity();
    const position = BABYLON.Vector3.Zero();
    addComponent(new Coordinates(position, BABYLON.Vector3.Zero(), 0), id);
    addComponent(new Appearance(id, position, false, mesh, false), id);
    addComponent(new Vitals(100), id);
    state.skills.push(new Skill('Space', true, 50, 1, 10, 50, 100));
    state.skills.push(new Skill('KeyE', true, 1000, 1, 50, 20, 50));
    return id;
};
