import { state } from './game';
import { camera, scene } from './main';

export function keyHandler(): void {
    if (map['ArrowDown'] || map['KeyS']) {
        state.cpts['appearance'][state.heroId].mesh.translate(BABYLON.Axis.Z, 20 / state.CPS, BABYLON.Space.LOCAL);
        state.cpts['coordinates'][state.heroId].position = state.cpts['appearance'][state.heroId].mesh.position;
    } else if (map['ArrowUp'] || map['KeyW']) {
        state.cpts['appearance'][state.heroId].mesh.translate(
            BABYLON.Axis.Z,
            map['ShiftLeft'] ? -30 / state.CPS : -20 / state.CPS,
            BABYLON.Space.LOCAL,
        );
        state.cpts['coordinates'][state.heroId].position = state.cpts['appearance'][state.heroId].mesh.position;
    }
    if (map['ArrowRight'] || map['KeyD']) {
        state.cpts['appearance'][state.heroId].mesh.translate(BABYLON.Axis.X, 10 / state.CPS, BABYLON.Space.LOCAL);
        state.cpts['coordinates'][state.heroId].position = state.cpts['appearance'][state.heroId].mesh.position;
    } else if (map['ArrowLeft'] || map['KeyA']) {
        state.cpts['appearance'][state.heroId].mesh.translate(BABYLON.Axis.X, -10 / state.CPS, BABYLON.Space.LOCAL);
        state.cpts['coordinates'][state.heroId].position = state.cpts['appearance'][state.heroId].mesh.position;
    }
    state.skills.forEach((skill) => {
        if (map[skill.key]) skill.use(state.heroId, state.pointer);
    });
}

const map = {};
onkeydown = function (e) {
    map[e.code] = true;
    if (e.code === 'KeyP') {
        state.setPause();
    }
    if (e.code === 'KeyL') {
        scene.meshes.forEach((mesh) => {
            console.log(`${mesh.name} -> ${mesh.parent && mesh.parent.name}`);
        });
    }
    e.stopPropagation();
};
onkeyup = function (e) {
    map[e.code] = false;
    e.stopPropagation();
};

document.addEventListener('keydown', onkeydown, false);
document.addEventListener('keyup', onkeyup, false);
document.addEventListener('wheel', (event) => {
    const delta = Math.sign(event.deltaY);
    camera.radius += 5 * delta;
});
