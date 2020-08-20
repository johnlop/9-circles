import { createEntity, addComponent } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { Vitals } from '../components/vitals';
import { Skill, Type } from './skill';
import { state } from '../game';

export const createHero = function (position: BABYLON.Vector3): number {
    const id = createEntity();
    addComponent(new Coordinates(position), id);
    addComponent(new Appearance(id, position, 'fps', { hasLabel: false, hasShadow: false }), id);
    addComponent(new Vitals(100), id);
    state.skills.push(new Skill('Space', Type.LASER, 600, 20, 100, 60, 1));
    state.skills.push(new Skill('KeyE', Type.LASER, 60, 100, 200, 90, 1));
    state.skills.push(new Skill('KeyQ', Type.LASER, 120, 20, 30, 40, 8));
    return id;
};
