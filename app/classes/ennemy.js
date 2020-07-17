function Ennemy() {
  ECS.Entity.call(this);
  this.addComponent(new ECS.components.Coordinates());
  this.components.coordinates.position.x = Math.random() * 100 - 50;
  this.components.coordinates.position.z = Math.random() * 100 - 50;
  this.components.coordinates.speed = 5;
  this.addComponent(
    new ECS.components.Appearance(
      this.components.coordinates.position,
      "ennemy",
      true
    )
  );
  this.addComponent(new ECS.components.Target(hero));
}
Ennemy.prototype = Object.create(ECS.Entity.prototype);
