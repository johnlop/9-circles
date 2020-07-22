import { scene, shadowGenerator, gui, library } from '../main';

export interface AppearanceOptions {
    hasLabel: boolean;
    hasShadow: boolean;
}

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

    public constructor(id: number, position: BABYLON.Vector3, type: string, options: AppearanceOptions) {
        if (library[type]) {
            this.mesh = library[type].clone();
            this.mesh.checkCollisions = true;
        } else if (type === 'laser') {
            this.mesh = BABYLON.MeshBuilder.CreateGround('pl', { width: 0.2, height: 100 }, scene);
            const laserMaterial = new BABYLON.StandardMaterial('shader', scene);
            laserMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0);
            laserMaterial.alphaMode = BABYLON.Engine.ALPHA_ADD;
            laserMaterial.alpha = 0.5;
            laserMaterial.backFaceCulling = false;
            this.mesh.material = laserMaterial;
        } else {
            this.mesh = BABYLON.MeshBuilder.CreateSphere('', { diameter: 1 }, scene);
        }

        this.mesh.name = id.toString();
        this.mesh.position = position;

        if (options.hasLabel) {
            this.label = new BABYLON.GUI.TextBlock();
            this.label.text = '100';
            this.label.fontSize = 30;
            this.label.color = 'white';
            gui.addControl(this.label);
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
