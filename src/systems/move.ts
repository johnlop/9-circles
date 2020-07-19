import { state } from '../game';

export function move() {
    let entity, dir;

    for (const id in state.cpts['coordinates']) {
        entity = state.cpts['coordinates'][id];

        //     if (entity.components.target) {
        //         entity.components.coordinates.direction = entity.components.target.entity.components.coordinates.position.subtract(
        //             entity.components.coordinates.position,
        //         );
        //         entity.components.coordinates.look = entity.components.target.entity.components.coordinates.position;
        //     }

        if (entity.look) {
            state.cpts['appearance'][id].mesh.lookAt(entity.look);
        }

        // if (entity.components.coordinates.direction) {
        //     dir = entity.components.coordinates.direction
        //         .normalize()
        //         .scaleInPlace(entity.components.coordinates.speed / state.CPS);
        //     entity.components.appearance.mesh.moveWithCollisions(dir);
        // }

        // Remove entities that have gone too far
        // if (
        //     BABYLON.Vector3.Distance(
        //         entity.components.coordinates.position,
        //         state.heroId.components.coordinates.position,
        //     ) > 100
        // ) {
        //     entity.remove();
        // }
    }
}
