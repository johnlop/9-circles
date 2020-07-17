import { Entity } from "../entities/entity";
import { Coordinates, Appearance, Target } from "../components/components";

export const createEnnemy = function (target) {
  let ennemy = new Entity();
  ennemy.addComponent(new Coordinates());
  ennemy.components["coordinates"].position.x = Math.random() * 100 - 50;
  ennemy.components["coordinates"].position.z = Math.random() * 100 - 50;
  ennemy.components["coordinates"].speed = 5;
  ennemy.addComponent(
    new Appearance(ennemy.components["coordinates"].position, "ennemy", true)
  );
  ennemy.addComponent(new Target(target));
  return ennemy;
};
