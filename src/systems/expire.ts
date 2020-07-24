import { state } from '../game';
import { removeEntity } from '../entities/entity';

export const expire = function (): void {
    let expiration;

    for (const id in state.cpts['expiration']) {
        expiration = state.cpts['expiration'][id];

        if (expiration.time <= Date.now()) {
            removeEntity(id);
        }
    }
};
