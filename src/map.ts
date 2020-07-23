import { scene, shadowGenerator } from './main';
import { createEnemy } from './classes/enemy';
import { createObstacle } from './classes/obstacle';
import { state } from './game';

export const createMap = (mapSize: number, gridSize: number, wallHeigh: number, pathLength: number) => {
    const map = [];
    for (let x = 0; x < mapSize; x++) {
        map[x] = [];
        for (let z = 0; z < mapSize; z++) {
            map[x][z] = 0;
        }
    }

    let x = mapSize / 2;
    let z = mapSize / 2;

    for (let i = 0; i < pathLength; i++) {
        map[x][z] = Math.ceil(Math.random() * 3);
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
            let mesh;
            const gridCenter = new BABYLON.Vector3(
                (x - mapSize / 2) * gridSize + gridSize / 2,
                0,
                (z - mapSize / 2) * gridSize + gridSize / 2,
            );
            if (map[x][z] === 0) {
                mesh = BABYLON.MeshBuilder.CreateBox(
                    '',
                    { width: gridSize, depth: gridSize, height: wallHeigh },
                    scene,
                );
                mesh.material = new BABYLON.StandardMaterial('walls', scene);
                mesh.material.diffuseTexture = new BABYLON.Texture('assets/img/paving.jpg', scene);
                mesh.material.specularColor = BABYLON.Color3.Black();
                shadowGenerator.addShadowCaster(mesh);
                mesh.position = new BABYLON.Vector3(gridCenter.x, wallHeigh / 2, gridCenter.z);
                mesh.checkCollisions = true;
            } else {
                mesh = BABYLON.MeshBuilder.CreateGround('', { width: gridSize, height: gridSize }, scene);
                mesh.material = new BABYLON.StandardMaterial('ground', scene);
                mesh.material.diffuseTexture = new BABYLON.Texture('assets/img/tiles.jpg', scene);
                mesh.material.specularColor = BABYLON.Color3.Black();
                mesh.receiveShadows = true;
                mesh.position = gridCenter;

                for (let i = 0; i < map[x][z] - 1; i++) {
                    const position = new BABYLON.Vector3(
                        gridCenter.x + (Math.random() - 0.5) * gridSize,
                        0,
                        gridCenter.z + (Math.random() - 0.5) * gridSize,
                    );
                    createEnemy('zombie', position, state.heroId);
                }
            }
        }
    }

    return map;
};
