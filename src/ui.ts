import * as BABYLON_GUI from 'babylonjs-gui';

export const UI = {
    gui: null,
    pauseScreen: null,
    text1: null,
    text2: null,
};

export const createUI = (): void => {
    UI.gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

    UI.pauseScreen = new BABYLON_GUI.TextBlock();
    UI.pauseScreen.text = 'PAUSE';
    UI.pauseScreen.color = 'white';
    UI.pauseScreen.fontSize = 100;
    UI.pauseScreen.isVisible = false;
    UI.gui.addControl(UI.pauseScreen);

    UI.text1 = new BABYLON_GUI.TextBlock();
    UI.text1.text = 'xp: ';
    UI.text1.color = 'white';
    UI.text1.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    UI.text1.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    UI.text1.fontSize = 16;
    UI.text1.paddingBottom = '5px';
    UI.text1.paddingLeft = '5px';
    UI.gui.addControl(UI.text1);

    UI.text2 = new BABYLON_GUI.TextBlock();
    UI.text2.color = 'white';
    UI.text2.textHorizontalAlignment = BABYLON_GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    UI.text2.textVerticalAlignment = BABYLON_GUI.Control.VERTICAL_ALIGNMENT_TOP;
    UI.text2.fontSize = 16;
    UI.text2.paddingTop = '5px';
    UI.text2.paddingRight = '5px';
    UI.gui.addControl(UI.text2);
};
