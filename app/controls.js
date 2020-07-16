function keyHandler(event) {
  if (map[39] || map[68]) {
    //right
    hero.components.appearance.mesh.translate(
      BABYLON.Axis.X,
      1,
      BABYLON.Space.LOCAL
    );
    hero.components.coordinates.position =
      hero.components.appearance.mesh.position;
  } else if (map[37] || map[65]) {
    //left
    hero.components.appearance.mesh.translate(
      BABYLON.Axis.X,
      -1,
      BABYLON.Space.LOCAL
    );
    hero.components.coordinates.position =
      hero.components.appearance.mesh.position;
  }
  if (map[40] || map[83]) {
    //down
    hero.components.appearance.mesh.translate(
      BABYLON.Axis.Z,
      -1,
      BABYLON.Space.LOCAL
    );
    hero.components.coordinates.position =
      hero.components.appearance.mesh.position;
  } else if (map[38] || map[87]) {
    //up
    hero.components.appearance.mesh.translate(
      BABYLON.Axis.Z,
      1,
      BABYLON.Space.LOCAL
    );
    hero.components.coordinates.position =
      hero.components.appearance.mesh.position;
  }
  if (map[32]) {
    //space
    var entity = new ECS.Entity();
    entity.addComponent(new ECS.components.Coordinates());
    entity.components.coordinates.position = hero.components.coordinates.position.clone();
    entity.addComponent(
      new ECS.components.Appearance(
        entity.components.coordinates.position,
        "bullet",
        false
      )
    );

    entity.components.coordinates.speed = 5;
    entity.components.coordinates.direction = pointer.subtract(
      entity.components.coordinates.position
    );
  }
  if (map[80]) {
    pause = !pause;
    pauseScreen.isVisible = pause;
  }
}

var map = {};
onkeydown = onkeyup = function (e) {
  // e = e || event;
  map[e.keyCode] = e.type === "keydown";
};

document.addEventListener("keydown", onkeydown, false);
document.addEventListener("keyup", onkeyup, false);
