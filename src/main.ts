import * as BABYLON_GUI from 'babylonjs-gui';
import '../assets/babylonjs.loaders';
import { keyHandler } from './controls';
import { createHero } from './classes/hero';
import { state } from './game';
import { createMap } from './map';
import { move } from './systems/move';
import { expire } from './systems/expire';

// Get the canvas element from the HTML
const canvas = document.querySelector('#renderCanvas') as HTMLCanvasElement;

// Load the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

const systems = [move, expire];
const assets = ['robot', 'zombie', 'tree1', 'tree2', 'tree3', 'tree4', 'tree5'];
const MAP_SIZE = 12;
const GRID_SIZE = 40;
const PATH_LENGTH = 100;
const WALL_HEIGH = 20;
export const TICKS = 30;

export let camera, light, shadowGenerator, ground, text1, text2, pauseScreen, gui;
export let scene;
export const library = {};

function createScene() {
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
    scene.collisionsEnabled = true;

    light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 16, 0), scene);
    light.intensity = 1;
    light.range = 50;

    const moon = new BABYLON.DirectionalLight('DirectionalLight', new BABYLON.Vector3(0, -1, 0), scene);
    moon.intensity = 0.1;

    camera = new BABYLON.ArcRotateCamera('Camera', 1, 0.8, 80, new BABYLON.Vector3(0, 0, 0), scene);

    shadowGenerator = new BABYLON.ShadowGenerator(512, light);
    shadowGenerator.usePercentageCloserFiltering = true;
    shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_LOW;

    gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

    loadAssets();
}

createScene();

function loadAssets() {
    const assetsManager = new BABYLON.AssetsManager(scene);
    assets.forEach((asset) => {
        const task = assetsManager.addMeshTask(asset, '', './assets/models/', `${asset}.glb`);
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
    state.cpts = { appearance: {}, vitals: {}, coordinates: {}, target: {}, expiration: {} };

    state.heroId = createHero(new BABYLON.Vector3(GRID_SIZE / 2, 0, GRID_SIZE / 2));
    camera.lockedTarget = state.cpts['appearance'][state.heroId].mesh;

    createMap(MAP_SIZE, GRID_SIZE, WALL_HEIGH, PATH_LENGTH);

    pauseScreen = new BABYLON_GUI.TextBlock();
    pauseScreen.text = 'PAUSE';
    pauseScreen.color = 'white';
    pauseScreen.fontSize = 100;
    pauseScreen.isVisible = false;
    gui.addControl(pauseScreen);

    text1 = new BABYLON_GUI.TextBlock();
    text1.text = 'xp: ';
    text1.color = 'white';
    text1.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text1.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text1.fontSize = 16;
    text1.paddingBottom = '5px';
    text1.paddingLeft = '5px';
    gui.addControl(text1);

    text2 = new BABYLON_GUI.TextBlock();
    text2.color = 'white';
    text2.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    text2.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;
    text2.fontSize = 16;
    text2.paddingTop = '5px';
    text2.paddingRight = '5px';
    gui.addControl(text2);

    setInterval(systemLoop, 1000 / TICKS);
    // Register a render loop to repeatedly render the state.scene
    engine.runRenderLoop(function () {
        const pickResult = scene.pick(scene.pointerX, scene.pointerY);
        if (pickResult.hit) {
            state.pointer = pickResult.pickedPoint;
            state.pointer.y = 0;
        }
        scene.render();
    });
}

function systemLoop() {
    if (!state.pause) {
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
