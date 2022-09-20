import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        isDisabled: false,
    },
    getters: {

        isDisabled: state => state.isDisabled,
    },
    mutations: {
        SET_DISABLED(state, isDisabled) {
            state.isDisabled = isDisabled;
        }
    }
})