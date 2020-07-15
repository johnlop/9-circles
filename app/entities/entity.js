ECS.Entity = function Entity() {
  ECS.Entity.prototype._count++;
  this.id = ECS.Entity.prototype._count;
  this.components = {};

  return this;
};

// keep track of entities created
ECS.Entity.prototype._count = 0;

ECS.Entity.prototype.addComponent = function addComponent(component) {
  // Add component data to the entity
  this.components[component.name] = component;
  return this;
};

ECS.Entity.prototype.removeComponent = function removeComponent(componentName) {
  // Remove component data by removing the reference to it.
  // Allows either a component function or a string of a component name to be
  // passed in
  var name = componentName; // assume a string was passed in

  if (typeof componentName === "function") {
    // get the name from the prototype of the passed component function
    name = componentName.prototype.name;
  }

  delete this.components[name];
  return this;
};

ECS.Entity.prototype.print = function print() {
  // Function to print / log information about the entity
  console.log(JSON.stringify(this, null, 4));
  return this;
};
