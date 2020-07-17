import * as BABYLON from "babylonjs";
import * as BABYLON_GUI from "babylonjs-gui";
import { keyHandler } from "./controls";
import { createEnnemy } from "./classes/ennemy";
import { move } from "./systems/move";
import { createHero } from "./classes/hero";

// Get the canvas element from the HTML
const canvas = document.querySelector("#renderCanvas") as HTMLCanvasElement;

// Load the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

export let camera, light, ground, pauseScreen, text1, text2;

export const state = {
  CPS: 60,
  scene: null,
  pause: false,
  setPause: () => {
    state.pause = !state.pause;
    pauseScreen.isVisible = state.pause;
  },
  index: 0,
  count: 0,
  hero: null,
  entities: {},
  gui: null,
  shadowGenerator: null,
  pointer: null,
};

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

  ground = BABYLON.Mesh.CreateGround("ground", 1500, 1500, 0, state.scene);
  ground.material = new BABYLON.StandardMaterial("groundmat", state.scene);
  ground.material.diffuseTexture = new BABYLON.Texture(
    "content/img/ground.jpg",
    state.scene
  );
  ground.material.diffuseTexture.uScale = 24;
  ground.material.diffuseTexture.vScale = 24;
  ground.material.specularColor = BABYLON.Color3.Black();
  ground.receiveShadows = true;
  // ground.checkCollisions = true;
}

function initGame() {
  state.hero = createHero();
  camera.lockedTarget = state.hero.components["appearance"].mesh;

  for (let i = 0; i < 10; i++) {
    createEnnemy(state.hero);
  }

  pauseScreen = new BABYLON_GUI.TextBlock();
  pauseScreen.text = "PAUSE";
  pauseScreen.color = "white";
  pauseScreen.fontSize = 100;
  pauseScreen.isVisible = false;
  state.gui.addControl(pauseScreen);

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
