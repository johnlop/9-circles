import { createEntity, addComponent } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { Vitals } from '../components/vitals';
import { Skill, Type } from './skill';
import { state } from '../game';

export const createHero = function (position: BABYLON.Vector3): number {
    const id = createEntity();
    addComponent(new Coordinates(position), id);
    addComponent(new Appearance(id, position, 'robot', { hasLabel: false, hasShadow: false }), id);
    addComponent(new Vitals(100), id);
    state.skills.push(new Skill('Space', Type.LASER, 50, 10, 100, 50, 1));
    state.skills.push(new Skill('KeyE', Type.LASER, 1000, 50, 200, 90, 1));
    state.skills.push(new Skill('KeyQ', Type.LASER, 500, 10, 30, 25, 8));
    return id;
};
