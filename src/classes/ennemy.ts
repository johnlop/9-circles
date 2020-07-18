import { Entity } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';

export const createEnnemy = function (target) {
    const ennemy = new Entity();
    ennemy.addComponent(new Coordinates());
    ennemy.components['coordinates'].position.x = Math.random() * 100 - 50;
    ennemy.components['coordinates'].position.z = Math.random() * 100 - 50;
    ennemy.components['coordinates'].speed = 5;
    ennemy.addComponent(new Appearance(ennemy.components['coordinates'].position, 'ennemy', true));
    // ennemy.addComponent(new Target(target));
    return ennemy;
};
