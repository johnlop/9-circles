import { state } from "./main";

export function keyHandler() {
  if (map["ArrowDown"] || map["KeyS"]) {
    state.hero.components.appearance.mesh.translate(
      BABYLON.Axis.Z,
      -0.5,
      BABYLON.Space.LOCAL
    );
    state.hero.components.coordinates.position =
      state.hero.components.appearance.mesh.position;
  } else if (map["ArrowUp"] || map["KeyW"]) {
    state.hero.components.appearance.mesh.translate(
      BABYLON.Axis.Z,
      map["ShiftLeft"] ? 1 : 0.5,
      BABYLON.Space.LOCAL
    );
    state.hero.components.coordinates.position =
      state.hero.components.appearance.mesh.position;
  }
  if (map["ArrowRight"] || map["KeyD"]) {
    state.hero.components.appearance.mesh.translate(
      BABYLON.Axis.X,
      0.5,
      BABYLON.Space.LOCAL
    );
    state.hero.components.coordinates.position =
      state.hero.components.appearance.mesh.position;
  } else if (map["ArrowLeft"] || map["KeyA"]) {
    state.hero.components.appearance.mesh.translate(
      BABYLON.Axis.X,
      -0.5,
      BABYLON.Space.LOCAL
    );
    state.hero.components.coordinates.position =
      state.hero.components.appearance.mesh.position;
  }
  state.hero.skills.forEach((skill) => {
    if (map[skill.key]) skill.use(state.hero, state.pointer);
  });
}

let map = {};
onkeydown = function (e) {
  map[e.code] = true;
  e.stopPropagation();
};
onkeyup = function (e) {
  map[e.code] = false;
  // Pause
  if (e.code === "KeyP") {
    state.setPause();
  }
  e.stopPropagation();
};

document.addEventListener("keydown", onkeydown, false);
document.addEventListener("keyup", onkeyup, false);
