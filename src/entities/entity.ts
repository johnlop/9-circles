import { state } from '../game';

export const createEntity = (): number => {
    state.index++;
    state.count++;
    return state.index;
};

export const removeEntity = (id): void => {
    for (const cpt in state.cpts) {
        removeComponent(cpt, id);
    }
};

export const addComponent = (component, id): void => {
    state.cpts[component.name][id] = component;
};

export const removeComponent = (componentName, id): void => {
    if (state.cpts[componentName][id]) {
        if (state.cpts[componentName][id].remove) {
            state.cpts[componentName][id].remove();
        }
        delete state.cpts[componentName][id];
    }
};
