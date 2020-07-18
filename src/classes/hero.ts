import { Entity } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Skill } from './skill';
import { Coordinates } from '../components/coordinates';
import { Vitals } from '../components/vitals';

export const createHero = function (mesh) {
    const hero = new Entity();
    hero.addComponent(new Coordinates());
    hero.addComponent(new Appearance(hero.components['coordinates'].position, 'hero', false, mesh));
    hero.addComponent(new Vitals(100));
    hero.skills.push(new Skill('Space', true, 500, 1, 10, 50, 100));
    hero.skills.push(new Skill('KeyE', true, 2000, 1, 10, 20, 50));
    return hero;
};
