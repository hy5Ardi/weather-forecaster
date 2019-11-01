export const state = () => ({
  weather: [],
  loading: false,
  recents: [],
  errors: []
});

export const mutations = {
  FETCH_WEATHER(state, payload) {
    state.weather = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  ADD_RECENT(state, payload) {
    state.recents.push(payload);
  },
  ADD_ERROR(state, payload) {
    state.errors.push(payload);
  },
  REMOVE_ERROR(state, payload) {
    state.errors.splice(payload, 1);
  }
};

export const actions = {
  fetchWeather(context, location) {
    context.commit('SET_LOADING', true);
    this.$axios.$get('/api/?q=' + location + '&APPID=8bcdc0f29b3ac7515c79b1b13458e6d4&units=metric').then(response => {
      context.commit('SET_LOADING', false);
      context.commit('FETCH_WEATHER', response);
      console.log(response);
    });
  },
  deleteError(context, error) {
    context.commit('REMOVE_ERROR', error);
  }
};

export const getters = {
  getRecents(state) {
    return state.recents;
  },
  getErrors(state) {
    return state.errors;
  }
};
