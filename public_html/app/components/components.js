// Appearance 
ECS.components.Appearance = function (position) {

    this.mesh = BABYLON.MeshBuilder.CreateBox("", {size: 2, height: 8}, scene);
    this.mesh.material = new BABYLON.StandardMaterial("selectcolor", scene);
    this.mesh.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    this.mesh.material.specularColor = BABYLON.Color3.Black();
    this.mesh.unit = this;
    this.mesh.position = position;

    return this;
};
ECS.components.Appearance.prototype.name = 'appearance';

// Coordinates 
ECS.components.Coordinates = function () {
    
    this.position = new BABYLON.Vector3(0, 0, 0);
    this.direction = new BABYLON.Vector3(0, 0, 0);
    this.speed = 0;

    return this;
};
ECS.components.Coordinates.prototype.name = 'coordinates';
