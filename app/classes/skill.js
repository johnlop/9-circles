function Skill(key, isProjectile, rate, projNumber, damage, speed, range) {
  this.key = key;
  this.isProjectile = isProjectile;
  this.skillLastUsed = Date.now();
  this.rateOfFire = rate;
  this.projNumber = projNumber;
  this.damage = damage;
  this.speed = speed;
  this.range = range;
}

Skill.prototype.use = function (user, targetPosition) {
  var now = Date.now();
  if (now - this.skillLastUsed > this.rateOfFire) {
    if (this.isProjectile) {
      let bullet = new ECS.Entity();
      bullet.addComponent(new ECS.components.Coordinates());
      bullet.components.coordinates.position = user.components.coordinates.position.clone();
      bullet.addComponent(
        new ECS.components.Appearance(
          bullet.components.coordinates.position,
          "bullet",
          false
        )
      );
      bullet.components.coordinates.speed = this.speed;
      bullet.components.coordinates.direction = targetPosition.subtract(
        bullet.components.coordinates.position
      );
    }
    this.skillLastUsed = now;
  }
};
