// Appearance
ECS.components.Appearance = function (position, type, hasLabel) {
  if (type === "hero") {
    this.mesh = BABYLON.MeshBuilder.CreateBox(
      "",
      { size: 2, height: 8 },
      scene
    );
    this.mesh.material = new BABYLON.StandardMaterial("selectcolor", scene);
    this.mesh.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    this.mesh.material.specularColor = BABYLON.Color3.Black();
    this.mesh.unit = this;
    this.mesh.position = position;
  } else if (type === "ennemy") {
    this.mesh = BABYLON.MeshBuilder.CreateBox(
      "",
      { size: 1, height: 6 },
      scene
    );
    this.mesh.material = new BABYLON.StandardMaterial("selectcolor", scene);
    this.mesh.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    this.mesh.material.specularColor = BABYLON.Color3.Black();
    this.mesh.unit = this;
    this.mesh.position = position;
  } else if (type === "bullet") {
    this.mesh = BABYLON.MeshBuilder.CreateSphere("", { diameter: 1 }, scene);
    this.mesh.material = new BABYLON.StandardMaterial("selectcolor", scene);
    this.mesh.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    this.mesh.material.specularColor = BABYLON.Color3.Black();
    this.mesh.unit = this;
    this.mesh.position = position;
  }

  if (hasLabel) {
    this.label = new BABYLON.GUI.TextBlock();
    this.label.text = "100";
    this.label.fontSize = 30;
    this.label.color = "white";
    gui.addControl(this.label);
    this.label.linkWithMesh(this.mesh);
    this.label.linkOffsetY = -100;
  }

  return this;
};
ECS.components.Appearance.prototype.name = "appearance";

// Coordinates
ECS.components.Coordinates = function () {
  this.position = new BABYLON.Vector3(0, 0, 0);
  this.direction = new BABYLON.Vector3(0, 0, 0);
  this.speed = 0;

  return this;
};
ECS.components.Coordinates.prototype.name = "coordinates";

// Target
ECS.components.Target = function (target) {
  this.entity = target;

  return this;
};
ECS.components.Target.prototype.name = "target";
