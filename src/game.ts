export const state = {
  CPS: 60,
  scene: null,
  pause: false,
  pauseScreen: null,
  setPause: () => {
    state.pause = !state.pause;
    state.pauseScreen.isVisible = state.pause;
  },
  index: 0,
  count: 0,
  hero: null,
  entities: {},
  gui: null,
  shadowGenerator: null,
  pointer: null,
};
