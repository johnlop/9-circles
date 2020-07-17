// Get the canvas element from the HTML
const canvas = document.querySelector("#renderCanvas");

// Load the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);
const CPS = 60;

let camera, light, pointer, ground, gui, hero, pauseScreen, shadowGenerator;
let pause = false;

function createScene() {
  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(1, 1, 1);
  scene.checkCollisions = true;
  // scene.collisionsEnabled = true;

  light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 12, 0), scene);
  light.intensity = 1;

  camera = new BABYLON.ArcRotateCamera(
    "Camera",
    1,
    0.8,
    80,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
  shadowGenerator.usePercentageCloserFiltering = true;

  gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  ground = BABYLON.Mesh.CreateGround("ground", 1500, 1500, 0, scene);
  ground.material = new BABYLON.StandardMaterial("groundmat", scene);
  ground.material.diffuseTexture = new BABYLON.Texture(
    "content/img/ground.jpg",
    scene
  );
  ground.material.diffuseTexture.uScale = 24;
  ground.material.diffuseTexture.vScale = 24;
  ground.material.specularColor = BABYLON.Color3.Black();
  ground.receiveShadows = true;
  // ground.checkCollisions = true;
}

function initGame() {
  hero = new Hero();
  camera.lockedTarget = hero.components.appearance.mesh;

  for (let i = 0; i < 10; i++) {
    new Ennemy();
  }

  pauseScreen = new BABYLON.GUI.TextBlock();
  pauseScreen.text = "PAUSE";
  pauseScreen.color = "white";
  pauseScreen.fontSize = 100;
  pauseScreen.isVisible = false;
  gui.addControl(pauseScreen);

  text1 = new BABYLON.GUI.TextBlock();
  text1.text = "xp: " + hero.experience;
  text1.color = "white";
  text1.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  text1.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  text1.fontSize = 16;
  text1.paddingBottom = "5px";
  text1.paddingLeft = "5px";
  gui.addControl(text1);

  text2 = new BABYLON.GUI.TextBlock();
  text2.color = "white";
  text2.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  text2.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
  text2.fontSize = 16;
  text2.paddingTop = "5px";
  text2.paddingRight = "5px";
  gui.addControl(text2);
}

createScene();
initGame();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  let pickResult = scene.pick(scene.pointerX, scene.pointerY);
  if (pickResult.hit) {
    pointer = pickResult.pickedPoint;
  }
  scene.render();
});

let systems = [ECS.systems.move];
setInterval(systemLoop, 1000 / CPS);

function systemLoop() {
  if (!pause) {
    if (pointer) {
      hero.components.coordinates.look = pointer;
      light.position.x = hero.components.coordinates.position.x;
      light.position.z = hero.components.coordinates.position.z;
    }

    for (let i in systems) {
      systems[i](ECS.entities);
    }

    keyHandler();

    text1.text =
      hero.components.vitals.life + " / " + hero.components.vitals.maxLife;
    text2.text = engine.getFps().toFixed() + "fps / " + scene.meshes.length;
  }
}

// Watch for browser/canvas resize eventsw
window.addEventListener("resize", function () {
  engine.resize();
});
