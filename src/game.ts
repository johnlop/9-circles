export const state = {
    CPS: 30,
    pause: false,
    pauseScreen: null,
    setPause: () => {
        state.pause = !state.pause;
        state.pauseScreen.isVisible = state.pause;
    },
    index: 0,
    count: 0,
    heroId: null,
    skills: [],
    cpts: {},
    gui: null,
    pointer: null,
};
