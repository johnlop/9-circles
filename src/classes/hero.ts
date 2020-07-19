import { createEntity, addComponent } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { Vitals } from '../components/vitals';
import { Skill } from './skill';
import { state } from '../game';

export const createHero = function (mesh) {
    const id = createEntity();
    addComponent(new Coordinates(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), 0), id);
    addComponent(new Appearance(state.cpts['coordinates'][id].position, false, mesh, false), id);
    addComponent(new Vitals(100), id);
    // hero.skills.push(new Skill('Space', true, 500, 1, 10, 50, 100));
    // hero.skills.push(new Skill('KeyE', true, 2000, 1, 10, 20, 50));
    return id;
};
