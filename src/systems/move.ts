import { state } from '../game';
import { removeEntity } from '../entities/entity';
import { CPS } from '../main';

export function move() {
    let coordinates, targetCoordinates, dir;

    for (const id in state.cpts['coordinates']) {
        coordinates = state.cpts['coordinates'][id];

        if (state.cpts['target'][id]) {
            targetCoordinates = state.cpts['coordinates'][state.cpts['target'][id].id];
            coordinates.direction = targetCoordinates.position.subtract(coordinates.position);
            coordinates.look = targetCoordinates.position;
        }

        if (coordinates.look) {
            state.cpts['appearance'][id].mesh.lookAt(coordinates.look);
        }

        if (coordinates.direction) {
            dir = coordinates.direction.normalize().scaleInPlace(coordinates.speed / CPS);
            state.cpts['appearance'][id].mesh.moveWithCollisions(dir);
        }

        // Remove entities that have gone too far
        if (BABYLON.Vector3.Distance(coordinates.position, state.cpts['coordinates'][state.heroId].position) > 100) {
            removeEntity(id);
        }
    }
}
