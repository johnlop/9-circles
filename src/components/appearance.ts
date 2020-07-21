import { state } from '../game';
import { scene, shadowGenerator, gui, library } from '../main';

// Appearance
export class Appearance {
    public name = 'appearance';
    public mesh: BABYLON.Mesh;
    public label: BABYLON.GUI.TextBlock;

    public constructor(id, position, hasLabel = false, type = null, hasShadow = true) {
        if (library[type]) {
            this.mesh = library[type].clone();
            this.mesh.checkCollisions = true;
        } else if (type === 'laser') {
            this.mesh = BABYLON.MeshBuilder.CreateGround('pl', { width: 0.5, height: 100 }, scene);
            const laserMaterial = new BABYLON.StandardMaterial('shader', scene);
            laserMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);
            laserMaterial.alphaMode = BABYLON.Engine.ALPHA_ADD;
            laserMaterial.alpha = 0.5;
            laserMaterial.backFaceCulling = false;
            this.mesh.material = laserMaterial;
        } else {
            this.mesh = BABYLON.MeshBuilder.CreateSphere('', { diameter: 1 }, scene);
        }

        this.mesh.name = id;
        this.mesh.position = position;

        if (hasLabel) {
            this.label = new BABYLON.GUI.TextBlock();
            this.label.text = '100';
            this.label.fontSize = 30;
            this.label.color = 'white';
            gui.addControl(this.label);
            this.label.linkWithMesh(this.mesh);
            this.label.linkOffsetY = -60;
        }

        if (hasShadow) {
            shadowGenerator.addShadowCaster(this.mesh);
            this.mesh.isPickable = false;
        }

        return this;
    }

    public remove(): void {
        this.mesh.dispose();
        if (this.label) {
            this.label.dispose();
        }
    }
}
