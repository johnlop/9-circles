import { state } from './game';
import { camera, scene, TICKS, light } from './main';
import { Appearance } from './components/appearance';
import { Coordinates } from './components/coordinates';

export function keyHandler(): void {
    const appearance = state.cpts['appearance'][state.heroId] as Appearance;
    const coordinates = state.cpts['coordinates'][state.heroId] as Coordinates;
    state.cpts['appearance'][state.heroId].mesh.lookAt(state.pointer);
    const direction = state.pointer.subtract(coordinates.position).normalize();

    if (map['ArrowUp'] || map['KeyW']) {
        appearance.mesh.moveWithCollisions(direction.scale((map['ShiftLeft'] ? 50 : 30) / TICKS));
    } else if (map['ArrowDown'] || map['KeyS']) {
        appearance.mesh.moveWithCollisions(direction.scale(-30 / TICKS));
    }
    if (map['ArrowRight'] || map['KeyD']) {
        const dir = new BABYLON.Vector3(direction.z, direction.y, -direction.x);
        appearance.mesh.moveWithCollisions(dir.scale(20 / TICKS));
    } else if (map['ArrowLeft'] || map['KeyA']) {
        const dir = new BABYLON.Vector3(-direction.z, direction.y, direction.x);
        appearance.mesh.moveWithCollisions(dir.scale(20 / TICKS));
    }
    coordinates.position = appearance.mesh.position;
    light.position.x = appearance.mesh.position.x;
    light.position.z = appearance.mesh.position.z;

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
    if (e.code === 'KeyO') {
        console.log(state.cpts['coordinates'][state.heroId].position);
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
