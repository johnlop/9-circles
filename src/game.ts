import { UI } from './ui';

export const state = {
    pause: false,
    setPause: () => {
        state.pause = !state.pause;
        UI.pauseScreen.isVisible = state.pause;
    },
    index: 0,
    count: 0,
    heroId: null,
    skills: [],
    cpts: {},
    pointer: null,
};
