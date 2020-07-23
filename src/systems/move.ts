import { state } from '../game';
import { TICKS } from '../main';

export function move(): void {
    let coordinates, target, targetCoordinates, appearance, dir, distance;

    for (const id in state.cpts['target']) {
        target = state.cpts['target'][id];
        coordinates = state.cpts['coordinates'][id];
        appearance = state.cpts['appearance'][id];
        targetCoordinates = state.cpts['coordinates'][target.id];

        distance = targetCoordinates.position.subtract(coordinates.position);

        if (distance.length() < target.range) {
            appearance.mesh.lookAt(targetCoordinates.position);

            dir = targetCoordinates.position
                .subtract(coordinates.position)
                .normalize()
                .scaleInPlace(target.speed / TICKS);
            appearance.mesh.moveWithCollisions(dir);
        }
    }
}
