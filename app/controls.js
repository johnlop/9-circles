function keyHandler(event) {
  if (map["ArrowDown"] || map["KeyS"]) {
    hero.components.appearance.mesh.translate(
      BABYLON.Axis.Z,
      -0.5,
      BABYLON.Space.LOCAL
    );
    hero.components.coordinates.position =
      hero.components.appearance.mesh.position;
  } else if (map["ArrowUp"] || map["KeyW"]) {
    hero.components.appearance.mesh.translate(
      BABYLON.Axis.Z,
      map["ShiftLeft"] ? 1 : 0.5,
      BABYLON.Space.LOCAL
    );
    hero.components.coordinates.position =
      hero.components.appearance.mesh.position;
  }
  if (map["ArrowRight"] || map["KeyD"]) {
    hero.components.appearance.mesh.translate(
      BABYLON.Axis.X,
      0.5,
      BABYLON.Space.LOCAL
    );
    hero.components.coordinates.position =
      hero.components.appearance.mesh.position;
  } else if (map["ArrowLeft"] || map["KeyA"]) {
    hero.components.appearance.mesh.translate(
      BABYLON.Axis.X,
      -0.5,
      BABYLON.Space.LOCAL
    );
    hero.components.coordinates.position =
      hero.components.appearance.mesh.position;
  }
  if (map["Space"]) {
    let bullet = new ECS.Entity();
    bullet.addComponent(new ECS.components.Coordinates());
    bullet.components.coordinates.position = hero.components.coordinates.position.clone();
    bullet.addComponent(
      new ECS.components.Appearance(
        bullet.components.coordinates.position,
        "bullet",
        false
      )
    );

    bullet.components.coordinates.speed = 5;
    bullet.components.coordinates.direction = pointer.subtract(
      bullet.components.coordinates.position
    );
  }
}

let map = {};
onkeydown = function (e) {
  map[e.code] = true;
};
onkeyup = function (e) {
  map[e.code] = false;
  // Pause
  if (e.code === "KeyP") {
    pause = !pause;
    pauseScreen.isVisible = pause;
  }
};

document.unbind("keypress");
document.addEventListener("keydown", onkeydown, false);
document.addEventListener("keyup", onkeyup, false);
