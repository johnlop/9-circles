import { state } from '../game';
import { Skill } from '../classes/skill';

export const createEntity = (): number => {
    state.index++;
    state.count++;
    return state.index;
};

export const addComponent = (component, id): void => {
    state.cpts[component.name][id] = component;
};

export const removeComponent = (componentName, id): void => {
    if (state.cpts[componentName][id].remove) {
        state.cpts[componentName][id].remove();
    }
    delete state.cpts[componentName][id];
};

// export class Entity {
//     public id: number;
//     public components: any;
//     public skills: Skill[];

//     public constructor() {
//         state.index++;
//         state.count++;
//         this.id = state.index;
//         this.components = {};
//         this.skills = [];
//     }

//     public remove(): void {
//         for (const componentName in this.components) {
//             this.removeComponent(componentName);
//         }
//         delete state.entities[this.id.toString()];
//         state.count--;
//     }

//     public addComponent(component): void {
//         // Add component data to the entity
//         this.components[component.name] = component;
//     }

//     public removeComponent(componentName): void {
//         // Remove component data by removing the reference to it.
//         // Allows either a component function or a string of a component name to be
//         // passed in
//         let name = componentName; // assume a string was passed in

//         if (typeof componentName === 'function') {
//             // get the name from the prototype of the passed component function
//             name = componentName.prototype.name;
//         }

//         if (this.components[name].remove) this.components[name].remove();

//         delete this.components[name];
//     }
// }
