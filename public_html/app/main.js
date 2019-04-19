// Get the canvas element from our HTML below
var canvas = document.querySelector("#renderCanvas");

// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);

var camera, light, pointer, ground, advancedTexture, hero;
var mousePressed = false;

function createScene() {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    scene.checkCollisions = true;
    scene.collisionsEnabled = true;

    light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 12, 0), scene);
    light.intensity = 1;

    camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 80, new BABYLON.Vector3(0, 0, 0), scene);

    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    ground = BABYLON.Mesh.CreateGround("ground", 1500, 1500, 2, scene);
    ground.material = new BABYLON.StandardMaterial("groundmat", scene);
    ground.material.diffuseTexture = new BABYLON.Texture("content/img/ground.jpg", scene);
    ground.material.diffuseTexture.uScale = 24;
    ground.material.diffuseTexture.vScale = 24;
    ground.material.specularColor = BABYLON.Color3.Black();
}

function initGame() {
    var entity = new ECS.Entity();
    entity.addComponent(new ECS.components.Coordinates());
    entity.addComponent(new ECS.components.Appearance(entity.components.coordinates.position));
    ECS.entities[entity.id] = entity;
    hero = entity;
    camera.lockedTarget = hero.components.appearance.mesh;
}

createScene();
initGame();

var systems = [
    ECS.systems.move
];

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

ground.actionManager = new BABYLON.ActionManager(scene);
ground.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger,
    function () {
        mousePressed = true;
    }));
ground.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,
    function () {
        mousePressed = false;
    }));

function keyHandler(event) {
    if(map[39] || map[68]) { //right
        hero.components.appearance.mesh.translate(BABYLON.Axis.X, -1, BABYLON.Space.LOCAL);
        hero.components.coordinates.position = hero.components.appearance.mesh.position;
    } else if(map[37] || map[65]) { //left
        hero.components.appearance.mesh.translate(BABYLON.Axis.X, 1, BABYLON.Space.LOCAL);
        hero.components.coordinates.position = hero.components.appearance.mesh.position;
    }
    if(map[40] || map[83]) { //down
        hero.components.appearance.mesh.translate(BABYLON.Axis.Z, 1, BABYLON.Space.LOCAL);
        hero.components.coordinates.position = hero.components.appearance.mesh.position;
    } else if(map[38] || map[87]) { //up
        hero.components.appearance.mesh.translate(BABYLON.Axis.Z, -1, BABYLON.Space.LOCAL);
        hero.components.coordinates.position = hero.components.appearance.mesh.position;
    }
    if(map[32]) { //space
        var entity = new ECS.Entity();
        entity.addComponent(new ECS.components.Coordinates());
        entity.components.coordinates.position = hero.components.coordinates.position.clone();
        entity.addComponent(new ECS.components.Appearance(entity.components.coordinates.position));
        
        entity.components.coordinates.speed = 5;
        //entity.components.coordinates.direction = pointer.subtract(entity.components.coordinates.position);
        entity.components.coordinates.target = pointer;
        ECS.entities[entity.id] = entity;
    }
}

var map = {};
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
}

document.addEventListener('keydown', onkeydown, false);
document.addEventListener('keyup', onkeyup, false);

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
