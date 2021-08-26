import Vue from "vue";
import Vuex from "vuex";
import Configuration from "./Configuration";
import Ui from "./ui";
import InternModule from "./InternModule"
import Attendance from "./AttendanceModule";
import UsersModule from "./UsersModule";

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    uiModule: Ui,
    configurationModule: Configuration,
    internModule: InternModule,
    attendanceModule: Attendance
  }
});
