import Vue from "vue";
import Vuex from "vuex";
import Configuration from "./Configuration";
import Ui from "./ui";

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    uiModule: Ui,
    configurationModule: Configuration
  }
});
