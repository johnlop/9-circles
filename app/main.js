// Get the canvas element from our HTML below
var canvas = document.querySelector("#renderCanvas");

// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);

var camera, light, pointer, ground, gui, hero;
var mousePressed = false;

function createScene() {
  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(1, 1, 1);
  scene.checkCollisions = true;
  scene.collisionsEnabled = true;

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

  gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  ground = BABYLON.Mesh.CreateGround("ground", 1500, 1500, 2, scene);
  ground.material = new BABYLON.StandardMaterial("groundmat", scene);
  ground.material.diffuseTexture = new BABYLON.Texture(
    "content/img/ground.jpg",
    scene
  );
  ground.material.diffuseTexture.uScale = 24;
  ground.material.diffuseTexture.vScale = 24;
  ground.material.specularColor = BABYLON.Color3.Black();
}

function initGame() {
  var entity = new ECS.Entity();
  entity.addComponent(new ECS.components.Coordinates());
  entity.addComponent(
    new ECS.components.Appearance(
      entity.components.coordinates.position,
      "hero",
      true
    )
  );
  ECS.entities[entity.id] = entity;
  hero = entity;
  camera.lockedTarget = hero.components.appearance.mesh;
}

createScene();
initGame();

var systems = [ECS.systems.move];

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  if (true || mousePressed) {
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    if (pickResult.hit) {
      pointer = pickResult.pickedPoint;
    }
  }

  if (pointer) {
    hero.components.coordinates.target = pointer;
    light.position.x = hero.components.coordinates.position.x;
    light.position.z = hero.components.coordinates.position.z;
  }

  for (var i = 0; i < systems.length; i++) {
    systems[i](ECS.entities);
  }

  keyHandler();

  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
