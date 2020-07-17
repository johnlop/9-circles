import { state } from "../main";
import { Entity } from "../entities/entity";

// Appearance
export class Appearance {
  public name = "appearance";
  public mesh: BABYLON.Mesh;
  public label: BABYLON.GUI.TextBlock;

  public constructor(position, type, hasLabel) {
    let hasShadow = true;
    if (type === "hero") {
      this.mesh = BABYLON.MeshBuilder.CreateBox(
        "",
        { size: 2, height: 8 },
        state.scene
      );
      this.mesh.material = new BABYLON.StandardMaterial(
        "selectcolor",
        state.scene
      );
      // this.mesh.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      // this.mesh.material.specularColor = BABYLON.Color3.Black();
      // this.mesh.unit = this;
      this.mesh.position = position;
      // this.mesh.checkCollisions = true;
      hasShadow = false;
    } else if (type === "ennemy") {
      this.mesh = BABYLON.MeshBuilder.CreateBox(
        "",
        { size: 1, height: 6 },
        state.scene
      );
      this.mesh.material = new BABYLON.StandardMaterial(
        "selectcolor",
        state.scene
      );
      // this.mesh.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      // this.mesh.material.specularColor = BABYLON.Color3.Black();
      // this.mesh.unit = this;
      this.mesh.position = position;
      // this.mesh.checkCollisions = true;
    } else if (type === "bullet") {
      this.mesh = BABYLON.MeshBuilder.CreateSphere(
        "",
        { diameter: 1 },
        state.scene
      );
      this.mesh.material = new BABYLON.StandardMaterial(
        "selectcolor",
        state.scene
      );
      // this.mesh.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
      // this.mesh.material.specularColor = BABYLON.Color3.Black();
      // this.mesh.unit = this;
      this.mesh.position = position;
    }

    if (hasLabel) {
      this.label = new BABYLON.GUI.TextBlock();
      this.label.text = "100";
      this.label.fontSize = 30;
      this.label.color = "white";
      state.gui.addControl(this.label);
      this.label.linkWithMesh(this.mesh);
      this.label.linkOffsetY = -100;
    }

    if (hasShadow) {
      state.shadowGenerator.getShadowMap().renderList.push(this.mesh);
    }

    return this;
  }

  public remove() {
    this.mesh.dispose();
    if (this.label) {
      this.label.dispose();
    }
  }
}

// Coordinates
export class Coordinates {
  public name = "coordinates";
  public position: BABYLON.Vector3;
  public direction: BABYLON.Vector3;
  public speed: number;

  public constructor() {
    this.position = new BABYLON.Vector3(0, 0, 0);
    this.direction = new BABYLON.Vector3(0, 0, 0);
    this.speed = 0;
  }
}

// Target
export class Target {
  public name = "target";
  public entity: Entity;

  public constructor(target) {
    this.entity = target;
  }
}

// Vitals
export class Vitals {
  public name = "vitals";
  public life: number;
  public maxLife: number;

  public constructor(life) {
    this.life = life;
    this.maxLife = life;
  }
}
