// ECS - System - Move
// --------------------------------------
ECS.systems.move = function (entities) {
  let entity, dir;

  for (let id in entities) {
    entity = entities[id];

    if (entity.components.coordinates) {
      if (entity.components.target) {
        entity.components.coordinates.direction = entity.components.target.entity.components.coordinates.position.subtract(
          entity.components.coordinates.position
        );
        entity.components.coordinates.look =
          entity.components.target.entity.components.coordinates.position;
      }

      if (entity.components.coordinates.look) {
        entity.components.appearance.mesh.lookAt(
          entity.components.coordinates.look
        );
      }

      if (entity.components.coordinates.direction) {
        dir = entity.components.coordinates.direction
          .normalize()
          .scaleInPlace(entity.components.coordinates.speed);
        entity.components.appearance.mesh.moveWithCollisions(dir);
      }

      // Remove entities that have gone too far
      if (
        BABYLON.Vector3.Distance(
          entity.components.coordinates.position,
          hero.components.coordinates.position
        ) > 100
      ) {
        entity.remove();
      }
    }
  }
};
