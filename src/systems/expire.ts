import { state } from '../game';
import { removeEntity } from '../entities/entity';

export const expire = function () {
    let expiration;

    for (const id in state.cpts['expiration']) {
        expiration = state.cpts['expiration'][id];
        console.log(expiration.time - Date.now());
        if (expiration.time <= Date.now()) {
            removeEntity(id);
        }
    }
};
