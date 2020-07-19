import { createEntity, addComponent } from '../entities/entity';
import { Appearance } from '../components/appearance';
import { Coordinates } from '../components/coordinates';
import { Target } from '../components/target';
import { state } from '../game';

export const createEnemy = function (mesh, targetId) {
    const id = createEntity();
    addComponent(
        new Coordinates(
            new BABYLON.Vector3(Math.random() * 100 - 50, 0, Math.random() * 100 - 50),
            BABYLON.Vector3.Zero(),
            5,
        ),
        id,
    );
    addComponent(new Appearance(state.cpts['coordinates'][id].position, true, mesh, true), id);
    addComponent(new Target(targetId), id);
    return id;
};
