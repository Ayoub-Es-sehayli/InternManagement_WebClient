import Vue from "vue";
import Vuex from "vuex";
import Ui from "./ui";

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    uiModule: Ui
  }
});
