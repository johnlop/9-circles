import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";
import "../content/babylonjs.loaders";
import { keyHandler } from "./controls";
import { createEnnemy } from "./classes/ennemy";
import { move } from "./systems/move";
import { createHero } from "./classes/hero";
import { state } from "./game";

// Get the canvas element from the HTML
const canvas = document.querySelector("#renderCanvas") as HTMLCanvasElement;

// Load the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

export let camera, light, ground, text1, text2;

function createScene() {
  state.scene = new BABYLON.Scene(engine);
  state.scene.clearColor = new BABYLON.Color3(1, 1, 1);
  state.scene.checkCollisions = true;

  light = new BABYLON.PointLight(
    "light",
    new BABYLON.Vector3(0, 12, 0),
    state.scene
  );
  light.intensity = 1;

  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    1,
    0.8,
    80,
    new BABYLON.Vector3(0, 0, 0),
    state.scene
  );

  state.shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
  state.shadowGenerator.usePercentageCloserFiltering = true;

  state.gui = BABYLON_GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 0, state.scene);
  ground.material = new BABYLON.StandardMaterial("groundmat", state.scene);
  ground.material.diffuseTexture = new BABYLON.Texture(
    "content/img/tiles.jpg",
    state.scene
  );
  ground.material.diffuseTexture.uScale = 20;
  ground.material.diffuseTexture.vScale = 20;
  ground.material.specularColor = BABYLON.Color3.Black();
  ground.receiveShadows = true;

  var assetsManager = new BABYLON.AssetsManager(state.scene);
  var meshTask = assetsManager.addMeshTask(
    "task",
    "",
    "./content/",
    "robot.glb"
  );
  meshTask.onSuccess = function (task) {
    state.hero.components["appearance"].mesh = task.loadedMeshes[0];
    task.loadedMeshes[0].position = new BABYLON.Vector3();
    task.loadedMeshes[0].scaling = new BABYLON.Vector3(5, 5, 5);
  };
  meshTask.onError = function (task, message, exception) {
    console.log(message, exception);
  };
  assetsManager.load();
  // BABYLON.SceneLoader.ImportMesh(
  //   "",
  //   "./content/",
  //   "robot.glb",
  //   state.scene,
  //   function (meshes, particleSystems, skeletons) {
  //     // BABYLON.Mesh.MergeMeshes(meshes);
  //     meshes[0].position = new BABYLON.Vector3(0, 5, 0);
  //     meshes[0].scaling = new BABYLON.Vector3(5, 5, 5);
  //     meshes[0].material = new BABYLON.StandardMaterial(
  //       "selectcolor",
  //       state.scene
  //     );
  //   }
  // );
}

function initGame() {
  state.hero = createHero();
  camera.lockedTarget = state.hero.components["appearance"].mesh;

  for (let i = 0; i < 10; i++) {
    createEnnemy(state.hero);
  }

  state.pauseScreen = new BABYLON_GUI.TextBlock();
  state.pauseScreen.text = "PAUSE";
  state.pauseScreen.color = "white";
  state.pauseScreen.fontSize = 100;
  state.pauseScreen.isVisible = false;
  state.gui.addControl(state.pauseScreen);

  text1 = new BABYLON_GUI.TextBlock();
  text1.text = "xp: " + state.hero.experience;
  text1.color = "white";
  text1.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  text1.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  text1.fontSize = 16;
  text1.paddingBottom = "5px";
  text1.paddingLeft = "5px";
  state.gui.addControl(text1);

  text2 = new BABYLON_GUI.TextBlock();
  text2.color = "white";
  text2.textHorizontalAlignment =
    BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  text2.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;
  text2.fontSize = 16;
  text2.paddingTop = "5px";
  text2.paddingRight = "5px";
  state.gui.addControl(text2);
}

createScene();
initGame();

// Register a render loop to repeatedly render the state.scene
engine.runRenderLoop(function () {
  let pickResult = state.scene.pick(state.scene.pointerX, state.scene.pointerY);
  if (pickResult.hit) {
    state.pointer = pickResult.pickedPoint;
  }
  state.scene.render();
});

let systems = [move];
setInterval(systemLoop, 1000 / state.CPS);

function systemLoop() {
  if (!state.pause) {
    if (state.pointer) {
      state.hero.components["coordinates"].look = state.pointer;
      light.position.x = state.hero.components["coordinates"].position.x;
      light.position.z = state.hero.components["coordinates"].position.z;
    }

    for (let i in systems) {
      systems[i](state.entities);
    }

    keyHandler();

    text1.text =
      state.hero.components["vitals"].life +
      " / " +
      state.hero.components["vitals"].maxLife;
    text2.text =
      engine.getFps().toFixed() + "fps / " + state.scene.meshes.length;
  }
}

// Watch for browser/canvas resize eventsw
window.addEventListener("resize", function () {
  engine.resize();
});
