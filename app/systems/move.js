// ECS - System - Move
// --------------------------------------
ECS.systems.move = function renderSystem(entities) {
  var entity, dir;

  for (var id in entities) {
    entity = entities[id];

    if (entity.components.coordinates) {
      if (entity.components.coordinates.target) {
        entity.components.coordinates.direction = entity.components.coordinates.target.subtract(
          entity.components.coordinates.position
        );
        entity.components.appearance.mesh.lookAt(
          entity.components.coordinates.target
        );
      }

      if (
        entity.components.coordinates.direction &&
        entity.components.coordinates.direction.length() > 2
      ) {
        dir = entity.components.coordinates.direction
          .normalize()
          .scaleInPlace(entity.components.coordinates.speed);
        entity.components.appearance.mesh.moveWithCollisions(dir);
      }
    }
  }
};
