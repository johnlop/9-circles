import { state } from '../game';

// Appearance
export class Appearance {
    public name = 'appearance';
    public mesh: BABYLON.Mesh;
    public label: BABYLON.GUI.TextBlock;

    public constructor(position, type, hasLabel = false, mesh = null) {
        let hasShadow = true;
        if (type === 'hero') {
            this.mesh = mesh;
            this.mesh.material = new BABYLON.StandardMaterial('selectcolor', state.scene);
            this.mesh.position = position;
            hasShadow = false;
        } else if (type === 'ennemy') {
            this.mesh = mesh;
            this.mesh.material = new BABYLON.StandardMaterial('selectcolor', state.scene);
            this.mesh.position = position;
        } else if (type === 'bullet') {
            this.mesh = BABYLON.MeshBuilder.CreateSphere('', { diameter: 1 }, state.scene);
            this.mesh.material = new BABYLON.StandardMaterial('selectcolor', state.scene);
            this.mesh.position = position;
        }

        if (hasLabel) {
            this.label = new BABYLON.GUI.TextBlock();
            this.label.text = '100';
            this.label.fontSize = 30;
            this.label.color = 'white';
            state.gui.addControl(this.label);
            this.label.linkWithMesh(this.mesh);
            this.label.linkOffsetY = -100;
        }

        if (hasShadow) {
            state.shadowGenerator.addShadowCaster(this.mesh);
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
