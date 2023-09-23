import createPersistedState from "vuex-persistedstate";
import Vuex from 'vuex';

const savedState = JSON.parse(localStorage.getItem('vuex-state'));

const store = new Vuex.Store({
    state: savedState || {
      user: {
        role: ''
      },
      userInformation: {}
    },
    mutations: {
        setUser(state) {
          state.user.role = 'user';
        },
        setAdmin(state) {
            state.user.role = 'admin';
        },
        resetRole(state) {
            state.user.role = '';
        },
        updateUserInformation(state, payload) {
          state.userInformation = payload
        }
      },
    actions: {
        asyncSetUser(context) {
            context.commit('setUser');
        },
        asyncSetAdmin(context) {
            context.commit('setAdmin');
        },
        asyncResetRole(context) {
            context.commit('resetRole');
        },
        addToUserInformation(context, payload) {
          context.commit('updateUserInformation', payload)
        }
    },
    plugins: [createPersistedState()]
}
    // ...
);

store.subscribe((mutation, state) => {
    localStorage.setItem('vuex-state', JSON.stringify(state));
  });

export default store