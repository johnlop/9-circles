import { scene, shadowGenerator, library } from '../main';
import { UI } from '../ui';

export enum Type {
    HERO = 1,
    ZOMBIE = 2,
    LASER = 3,
}

// Appearance
export class Appearance {
    public name = 'appearance';
    public mesh: BABYLON.Mesh;
    public label: BABYLON.GUI.TextBlock;

    public constructor(id: number, position: BABYLON.Vector3, type: string, options: any) {
        if (library[type]) {
            this.mesh = library[type].clone();
            this.mesh.checkCollisions = true;
        } else if (type === 'laser') {
            this.mesh = BABYLON.MeshBuilder.CreateGround('pl', { width: 0.2, height: options.length }, scene);
            const mat = new BABYLON.StandardMaterial('shader', scene);
            mat.emissiveColor = new BABYLON.Color3(1, 0, 0);
            mat.alphaMode = BABYLON.Engine.ALPHA_ADD;
            mat.alpha = 0.5;
            mat.backFaceCulling = false;
            this.mesh.material = mat;
        } else if (type === 'fps') {
            this.mesh = BABYLON.MeshBuilder.CreateSphere('fps', { diameter: 0.1 });
        } else {
            this.mesh = BABYLON.MeshBuilder.CreateBox('', { size: 5, height: 40 }, scene);
            this.mesh.checkCollisions = true;
            const mat = new BABYLON.StandardMaterial('col', scene);
            mat.diffuseTexture = new BABYLON.Texture('assets/img/paving.jpg', scene);
            mat.specularColor = BABYLON.Color3.Black();
            this.mesh.material = mat;
            this.mesh.receiveShadows = true;
        }

        this.mesh.name = id.toString();
        this.mesh.position = position;

        if (options.hasLabel) {
            this.label = new BABYLON.GUI.TextBlock();
            this.label.text = '100';
            this.label.fontSize = 30;
            this.label.color = 'white';
            UI.gui.addControl(this.label);
            this.label.linkWithMesh(this.mesh);
            this.label.linkOffsetY = -60;
        }

        if (options.hasShadow) {
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
