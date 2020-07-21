import { scene, shadowGenerator } from './main';

export const createMap = (mapSize: number, gridSize: number, pathLength: number) => {
    const map = [];
    for (let x = 0; x < mapSize; x++) {
        map[x] = [];
        for (let z = 0; z < mapSize; z++) {
            map[x][z] = 1;
        }
    }

    let x = mapSize / 2;
    let z = mapSize / 2;

    for (let i = 0; i < pathLength; i++) {
        map[x][z] = 0;
        const d = Math.floor(Math.random() * 4);
        if (d === 0) {
            x++;
        }
        if (d === 1) {
            x--;
        }
        if (d === 2) {
            z++;
        }
        if (d === 3) {
            z--;
        }
        if (x < 0) {
            x += 2;
        }
        if (x >= mapSize) {
            x -= 2;
        }
        if (z < 0) {
            z += 2;
        }
        if (z >= mapSize) {
            z -= 2;
        }
    }

    for (let x = 0; x < mapSize; x++) {
        for (let z = 0; z < mapSize; z++) {
            if (map[x][z] > 0) {
                const box = BABYLON.MeshBuilder.CreateBox('', { width: gridSize, depth: gridSize, height: 4 }, scene);
                shadowGenerator.addShadowCaster(box);
                box.position = new BABYLON.Vector3(
                    (x - mapSize / 2) * gridSize + gridSize / 2,
                    2,
                    (z - mapSize / 2) * gridSize + gridSize / 2,
                );
            }
        }
    }

    return map;
};
