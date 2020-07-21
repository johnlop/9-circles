import { state } from '../game';
import { scene, shadowGenerator, gui } from '../main';

// Appearance
export class Appearance {
    public name = 'appearance';
    public mesh: BABYLON.Mesh;
    public label: BABYLON.GUI.TextBlock;

    public constructor(id, position, hasLabel = false, mesh = null, hasShadow = true) {
        if (mesh) {
            this.mesh = mesh.clone();
        } else {
            this.mesh = BABYLON.MeshBuilder.CreateSphere('', { diameter: 1 }, scene);
        }
        this.mesh.name = id;

        this.mesh.material = new BABYLON.StandardMaterial('selectcolor', scene);
        this.mesh.position = position;

        if (hasLabel) {
            this.label = new BABYLON.GUI.TextBlock();
            this.label.text = '100';
            this.label.fontSize = 30;
            this.label.color = 'white';
            gui.addControl(this.label);
            this.label.linkWithMesh(this.mesh);
            this.label.linkOffsetY = -100;
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
