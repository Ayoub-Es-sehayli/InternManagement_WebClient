import Vue from "vue";
import Vuex from "vuex";
import Configuration from "./Configuration";
import Ui from "./ui";
import InternModule from "./InternModule"

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    uiModule: Ui,
    configurationModule: Configuration,
    internModule: InternModule
  }
});
