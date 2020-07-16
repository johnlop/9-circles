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
  hero = new ECS.Entity();
  hero.addComponent(new ECS.components.Coordinates());
  hero.addComponent(
    new ECS.components.Appearance(
      hero.components.coordinates.position,
      "hero",
      true
    )
  );
  ECS.entities[hero.id] = hero;
  camera.lockedTarget = hero.components.appearance.mesh;

  for (var i = 0; i < 10; i++) {
    var ennemy = new ECS.Entity();
    ennemy.addComponent(new ECS.components.Coordinates());
    ennemy.components.coordinates.position.x = Math.random() * 100 - 50;
    ennemy.components.coordinates.position.z = Math.random() * 100 - 50;
    ennemy.components.coordinates.speed = 0.1;
    ennemy.addComponent(
      new ECS.components.Appearance(
        ennemy.components.coordinates.position,
        "ennemy",
        true
      )
    );
    ennemy.addComponent(new ECS.components.Target(hero));
    ECS.entities[ennemy.id] = ennemy;
  }
}

createScene();
initGame();

var systems = [ECS.systems.move, ECS.systems.attack];

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  if (true || mousePressed) {
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    if (pickResult.hit) {
      pointer = pickResult.pickedPoint;
    }
  }

  if (pointer) {
    hero.components.coordinates.look = pointer;
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
