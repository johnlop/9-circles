// ECS - System - Collide
// --------------------------------------
ECS.systems.collide = function (entities) {
  let obj1, obj2;

  for (let id1 in entities) {
    obj1 = entities[id1];
    for (let id2 in entities) {
      obj2 = entities[id2];
      if (
        id1 !== id2 &&
        obj1.components.appearance.mesh.intersectsMesh(
          obj2.components.appearance.mesh,
          false
        )
      ) {
        console.log(`${obj1.id} intersects ${obj2.id}`);
      }
    }
  }
};
