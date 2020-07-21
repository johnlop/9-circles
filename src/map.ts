import { scene, shadowGenerator } from './main';

export const createMap = (mapSize: number, gridSize: number, wallHeigh: number, pathLength: number) => {
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
            let b;
            if (map[x][z] > 0) {
                b = BABYLON.MeshBuilder.CreateBox('', { width: gridSize, depth: gridSize, height: wallHeigh }, scene);
                b.material = new BABYLON.StandardMaterial('walls', scene);
                b.material.diffuseTexture = new BABYLON.Texture('assets/img/paving.jpg', scene);
                b.material.specularColor = BABYLON.Color3.Black();
                shadowGenerator.addShadowCaster(b);
                b.position = new BABYLON.Vector3(
                    (x - mapSize / 2) * gridSize + gridSize / 2,
                    wallHeigh / 2,
                    (z - mapSize / 2) * gridSize + gridSize / 2,
                );
                b.checkCollisions = true;
            } else {
                b = BABYLON.MeshBuilder.CreateGround('', { width: gridSize, height: gridSize }, scene);
                b.material = new BABYLON.StandardMaterial('ground', scene);
                b.material.diffuseTexture = new BABYLON.Texture('assets/img/earth.jpg', scene);
                b.material.specularColor = BABYLON.Color3.Black();
                b.receiveShadows = true;
                b.position = new BABYLON.Vector3(
                    (x - mapSize / 2) * gridSize + gridSize / 2,
                    0,
                    (z - mapSize / 2) * gridSize + gridSize / 2,
                );
            }
        }
    }

    return map;
};
