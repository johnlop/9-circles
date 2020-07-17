function Hero() {
  ECS.Entity.call(this);
  this.addComponent(new ECS.components.Coordinates());
  this.addComponent(
    new ECS.components.Appearance(
      this.components.coordinates.position,
      "hero",
      false
    )
  );
  this.addComponent(new ECS.components.Vitals(100));
  this.skills = [];
  this.skills.push(new Skill("Space", true, 500, 1, 10, 50, 100));
  this.skills.push(new Skill("KeyE", true, 2000, 1, 10, 20, 50));
}
Hero.prototype = Object.create(ECS.Entity.prototype);
