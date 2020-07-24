import '../assets/babylonjs.loaders';
import { keyHandler } from './controls';
import { createHero } from './classes/hero';
import { state } from './game';
import { createMap } from './map';
import { move } from './systems/move';
import { expire } from './systems/expire';
import { UI, createUI } from './ui';

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

export let camera, light, shadowGenerator, ground;
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

    // state.setPause();
    createUI();

    // setInterval(systemLoop, 1000 / TICKS);
    state.pointer = new BABYLON.Vector3(0, 0, 0);
    engine.runRenderLoop(function () {
        systemLoop();
        scene.render();
    });
}

function systemLoop() {
    if (!state.pause) {
        const pickResult = scene.pick(scene.pointerX, scene.pointerY);
        state.pointer = pickResult.pickedPoint;
        state.pointer.y = 0;

        for (const i in systems) {
            systems[i]();
        }

        keyHandler();

        UI.text1.text = state.cpts['vitals'][state.heroId].life + ' / ' + state.cpts['vitals'][state.heroId].maxLife;
        UI.text2.text = engine.getFps().toFixed() + 'fps / ' + scene.meshes.length;
    }
}

// Watch for browser/canvas resize eventsw
window.addEventListener('resize', function () {
    engine.resize();
});
