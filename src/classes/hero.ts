import { Entity } from "../entities/entity";
import { Appearance, Coordinates, Vitals } from "../components/components";
import { Skill } from "./skill";

export const createHero = function () {
  let hero = new Entity();
  hero.addComponent(new Coordinates());
  hero.addComponent(
    new Appearance(hero.components["coordinates"].position, "hero", false)
  );
  hero.addComponent(new Vitals(100));
  hero.skills.push(new Skill("Space", true, 500, 1, 10, 50, 100));
  hero.skills.push(new Skill("KeyE", true, 2000, 1, 10, 20, 50));
  return hero;
};
