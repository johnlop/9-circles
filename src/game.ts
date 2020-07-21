import { pauseScreen } from './main';

export const state = {
    CPS: 60,
    pause: false,
    setPause: () => {
        state.pause = !state.pause;
        pauseScreen.isVisible = state.pause;
    },
    index: 0,
    count: 0,
    heroId: null,
    skills: [],
    cpts: {},
    pointer: null,
};
