import { state } from "../game";

export class Entity {
  public id: Number;
  public components: {};
  public skills: any[];

  public constructor() {
    state.index++;
    state.count++;
    this.id = state.index;
    state.entities[this.id.toString()] = this;
    this.components = {};
    this.skills = [];
  }

  public remove() {
    for (let componentName in this.components) {
      this.removeComponent(componentName);
    }
    delete state.entities[this.id.toString()];
    state.count--;
  }

  public addComponent(component) {
    // Add component data to the entity
    this.components[component.name] = component;
  }

  public removeComponent(componentName) {
    // Remove component data by removing the reference to it.
    // Allows either a component function or a string of a component name to be
    // passed in
    let name = componentName; // assume a string was passed in

    if (typeof componentName === "function") {
      // get the name from the prototype of the passed component function
      name = componentName.prototype.name;
    }

    if (this.components[name].remove) this.components[name].remove();

    delete this.components[name];
  }
}
