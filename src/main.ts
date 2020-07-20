import * as BABYLON from 'babylonjs';
import * as BABYLON_GUI from 'babylonjs-gui';
import '../assets/babylonjs.loaders';
import { keyHandler } from './controls';
import { createEnemy } from './classes/enemy';
import { move } from './systems/move';
import { createHero } from './classes/hero';
import { state } from './game';
import { createTree } from './classes/tree';

// Get the canvas element from the HTML
const canvas = document.querySelector('#renderCanvas') as HTMLCanvasElement;

// Load the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

const systems = [move];
const assets = ['d4nt3', 'zombie', 'tree1', 'tree2', 'tree3', 'tree4', 'tree5'];

export let scene, camera, light, shadowGenerator, ground, text1, text2;
export const library = {};

function createScene() {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    scene.checkCollisions = true;

    light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 10, 0), scene);
    light.intensity = 0.8;
    light.range = 50;

    const moon = new BABYLON.DirectionalLight('DirectionalLight', new BABYLON.Vector3(-1, -1, -1), scene);
    moon.intensity = 0.3;

    camera = new BABYLON.ArcRotateCamera('Camera', 1, 0.8, 80, new BABYLON.Vector3(0, 0, 0), scene);

    shadowGenerator = new BABYLON.ShadowGenerator(512, light);
    shadowGenerator.usePercentageCloserFiltering = true;
    shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_LOW;

    state.gui = BABYLON_GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

    ground = BABYLON.Mesh.CreateGround('ground', 1000, 1000, 0, scene);
    ground.material = new BABYLON.StandardMaterial('groundmat', scene);
    ground.material.diffuseTexture = new BABYLON.Texture('assets/img/earth.jpg', scene);
    ground.material.diffuseTexture.uScale = 20;
    ground.material.diffuseTexture.vScale = 20;
    ground.material.specularColor = BABYLON.Color3.Black();
    ground.receiveShadows = true;

    loadAssets();
}

function loadAssets() {
    const assetsManager = new BABYLON.AssetsManager(scene);
    assets.forEach((asset) => {
        const task = assetsManager.addMeshTask(asset, '', './assets/', `${asset}.glb`);
        task.onSuccess = function (t) {
            t.loadedMeshes[0].setEnabled(false);
            library[asset] = t.loadedMeshes[0];
        };
    });
    assetsManager.onTaskError = function (task) {
        console.log(`Error: could not load ${task.name}`);
    };
    assetsManager.onFinish = function () {
        initGame();
    };
    assetsManager.load();
}

function initGame() {
    state.cpts['appearance'] = {};
    state.cpts['vitals'] = {};
    state.cpts['coordinates'] = {};
    state.cpts['target'] = {};

    state.heroId = createHero(library['d4nt3']);
    camera.lockedTarget = state.cpts['appearance'][state.heroId].mesh;

    for (let i = 0; i < 2; i++) {
        createEnemy(library['zombie'], state.heroId);
    }

    for (let i = 0; i < 20; i++) {
        const n = Math.ceil(Math.random() * 5);
        createTree(library[`tree${n}`]);
    }

    state.pauseScreen = new BABYLON_GUI.TextBlock();
    state.pauseScreen.text = 'PAUSE';
    state.pauseScreen.color = 'white';
    state.pauseScreen.fontSize = 100;
    state.pauseScreen.isVisible = false;
    state.gui.addControl(state.pauseScreen);

    text1 = new BABYLON_GUI.TextBlock();
    text1.text = 'xp: ';
    text1.color = 'white';
    text1.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text1.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text1.fontSize = 16;
    text1.paddingBottom = '5px';
    text1.paddingLeft = '5px';
    state.gui.addControl(text1);

    text2 = new BABYLON_GUI.TextBlock();
    text2.color = 'white';
    text2.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    text2.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;
    text2.fontSize = 16;
    text2.paddingTop = '5px';
    text2.paddingRight = '5px';
    state.gui.addControl(text2);

    setInterval(systemLoop, 1000 / state.CPS);
}

createScene();

// Register a render loop to repeatedly render the state.scene
engine.runRenderLoop(function () {
    const pickResult = scene.pick(scene.pointerX, scene.pointerY);
    if (pickResult.hit) {
        state.pointer = pickResult.pickedPoint;
        state.pointer.y = 0;
    }
    scene.render();
});

function systemLoop() {
    if (!state.pause) {
        if (state.pointer) {
            state.cpts['coordinates'][state.heroId].look = state.pointer;
            light.position.x = state.cpts['coordinates'][state.heroId].position.x;
            light.position.z = state.cpts['coordinates'][state.heroId].position.z;
        }

        for (const i in systems) {
            systems[i]();
        }

        keyHandler();

        text1.text = state.cpts['vitals'][state.heroId].life + ' / ' + state.cpts['vitals'][state.heroId].maxLife;
        text2.text = engine.getFps().toFixed() + 'fps / ' + scene.meshes.length;
    }
}

// Watch for browser/canvas resize eventsw
window.addEventListener('resize', function () {
    engine.resize();
});
